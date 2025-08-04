import { google } from 'googleapis';

// Environment variables
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const PRIMARY_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'sarai.syav@gmail.com';
const IMPERSONATE_USER_EMAIL = process.env.IMPERSONATE_USER_EMAIL;
// Additional calendar that blocks availability (e.g., Preply bookings)
const BUSY_CALENDAR_IDS = [
  PRIMARY_CALENDAR_ID,
  'c_7c78adbb83c842eaabac379c3ca6241c6325e5a029cfa72d363228f1a188d242@group.calendar.google.com'
];

// Time slots (Atlantic/Canary time)
const TIME_SLOTS = [
  '13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30','18:00','18:30',
  '19:00','19:30','20:00','20:30','21:00','21:30','22:00'
];

// Create Google Calendar client
const createCalendarClient = () => {
  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY || !IMPERSONATE_USER_EMAIL) {
    console.error('Google Calendar credentials not configured');
    return null;
  }

  const auth = new google.auth.JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: IMPERSONATE_USER_EMAIL
  });
  return google.calendar({ version: 'v3', auth });
};

// Helper date utilities (no external deps)
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const formatDate = (date) => date.toISOString().split('T')[0];
const isWeekend = (date) => [0, 6].includes(date.getDay());

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { days = 14, timezone = 'Atlantic/Canary' } = req.body || {};
    const numDays = Math.min(Math.max(parseInt(days, 10), 1), 60);

    const calendar = await createCalendarClient();
    if (!calendar) return res.status(500).json({ error: 'Calendar auth failed' });

    const startDate = new Date();
    const endDate = addDays(startDate, numDays);

    const fbRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: timezone,
        items: BUSY_CALENDAR_IDS.map(id => ({ id }))
      }
    });
    // Collect busy arrays from all queried calendars
    const busy = BUSY_CALENDAR_IDS.flatMap(id => (fbRes.data.calendars?.[id]?.busy) || []);

    const availability = {};
    for (let i = 0; i < numDays; i++) {
      const date = addDays(startDate, i);
      const dateKey = formatDate(date);
      if (isWeekend(date)) {
        availability[dateKey] = {
          date: dateKey,
          slots: TIME_SLOTS.map(t => ({ time: t, available: false, reason: 'weekend' }))
        };
        continue;
      }
      const { zonedTimeToUtc } = require('date-fns-tz');

      const slots = TIME_SLOTS.map(t => {
        const slotStart = zonedTimeToUtc(`${dateKey}T${t}:00`, timezone);
        const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);
        if (slotStart < new Date()) return { time: t, available: false, reason: 'past' };
        const conflicted = busy.some(b => slotStart < new Date(b.end) && slotEnd > new Date(b.start));
        return { time: t, available: !conflicted, reason: conflicted ? 'busy' : undefined };
      });
      availability[dateKey] = { date: dateKey, slots };
    }

    return res.json({ availability, timezone });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
};