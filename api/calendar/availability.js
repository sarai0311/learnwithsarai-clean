// Dynamic imports will be done inside the function

// Environment variables
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const PRIMARY_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'hola@learnwithsarai.com';
const IMPERSONATE_USER_EMAIL = process.env.IMPERSONATE_USER_EMAIL || 'hola@learnwithsarai.com';

// Additional calendar that blocks availability (e.g., Preply bookings)
const BUSY_CALENDAR_IDS = [
  PRIMARY_CALENDAR_ID,
  'c_7c78adbb83c842eaabac379c3ca6241c6325e5a029cfa72d363228f1a188d242@group.calendar.google.com'
];

// Time slots (Atlantic/Canary time) - 30-minute intervals from 14:00 to 22:00
const TIME_SLOTS = [
  '14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30','18:00','18:30',
  '19:00','19:30','20:00','20:30','21:00','21:30','22:00'
];

// Create Google Calendar client with domain-wide delegation
const createCalendarClient = async () => {
  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY || !IMPERSONATE_USER_EMAIL) {
    console.error('Google Calendar credentials not configured');
    return null;
  }

  const { google } = await import('googleapis');
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
const isWeekend = (date) => [0, 6].includes(date.getDay()); // Sunday (0) and Saturday (6)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { days = 14, timezone: userTimezone = 'Atlantic/Canary' } = req.body || {};
    const numDays = Math.min(Math.max(parseInt(days, 10), 1), 60);
    const saraiTimezone = 'Atlantic/Canary'; // Sarai's timezone is fixed

    const calendar = await createCalendarClient();
    if (!calendar) return res.status(500).json({ error: 'Calendar auth failed' });

    const startDate = new Date();
    const endDate = addDays(startDate, numDays);

    // Always query busy times in Sarai's timezone for accuracy
    const fbRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: saraiTimezone,
        items: BUSY_CALENDAR_IDS.map(id => ({ id }))
      }
    });
    // Collect busy arrays from all queried calendars
    const busy = BUSY_CALENDAR_IDS.flatMap(id => (fbRes.data.calendars?.[id]?.busy) || []);

    const { fromZonedTime, toZonedTime, format } = await import('date-fns-tz');
    
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
      
      const slots = [];
      
      // Convert each Canary time slot to user's timezone
      for (const canaryTime of TIME_SLOTS) {
        // Create datetime in Sarai's timezone
        const canaryDateTime = fromZonedTime(`${dateKey}T${canaryTime}:00`, saraiTimezone);
        
        // Convert to user's timezone
        const userDateTime = toZonedTime(canaryDateTime, userTimezone);
        const userTimeFormatted = format(userDateTime, 'HH:mm', { timeZone: userTimezone });
        const userDateFormatted = format(userDateTime, 'yyyy-MM-dd', { timeZone: userTimezone });
        
        // Check if this slot is in the past
        if (canaryDateTime < new Date()) {
          slots.push({ 
            time: userTimeFormatted, 
            available: false, 
            reason: 'past',
            originalCanaryTime: canaryTime,
            userDate: userDateFormatted
          });
          continue;
        }
        
        // Check if slot conflicts with busy times (check in Sarai's timezone)
        const slotEnd = new Date(canaryDateTime.getTime() + 30 * 60 * 1000);
        const conflicted = busy.some(b => canaryDateTime < new Date(b.end) && slotEnd > new Date(b.start));
        
        slots.push({
          time: userTimeFormatted,
          available: !conflicted,
          reason: conflicted ? 'busy' : undefined,
          originalCanaryTime: canaryTime,
          userDate: userDateFormatted
        });
      }
      
      // Group slots by user's date (important for timezone conversions that cross midnight)
      const slotsByDate = {};
      slots.forEach(slot => {
        if (!slotsByDate[slot.userDate]) {
          slotsByDate[slot.userDate] = [];
        }
        slotsByDate[slot.userDate].push(slot);
      });
      
      // Add slots to availability, potentially across multiple dates
      Object.entries(slotsByDate).forEach(([userDate, dateSlots]) => {
        if (!availability[userDate]) {
          availability[userDate] = {
            date: userDate,
            slots: []
          };
        }
        availability[userDate].slots.push(...dateSlots.map(slot => ({
          time: slot.time,
          available: slot.available,
          reason: slot.reason,
          originalCanaryTime: slot.originalCanaryTime
        })));
        
        // Sort slots by time
        availability[userDate].slots.sort((a, b) => a.time.localeCompare(b.time));
      });
    }

    return res.json({ availability, userTimezone, saraiTimezone });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
};