import { google } from 'googleapis';

// Google Calendar configuration
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const PRIMARY_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'sarai.syav@gmail.com';
const IMPERSONATE_USER_EMAIL = process.env.IMPERSONATE_USER_EMAIL;

// Create Google Calendar client using environment variables
const createCalendarClient = async () => {
  try {
    // Use environment variables for authentication
    if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
      console.error('Google Calendar credentials not configured');
      return null;
    }

    // Create credentials object from environment variables
    const auth = new google.auth.JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
      subject: IMPERSONATE_USER_EMAIL
    });
    return google.calendar({ version: 'v3', auth });
  } catch (error) {
    console.error('Error creating Google Calendar client:', error);
    return null;
  }
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      title, 
      description, 
      startDateTime, 
      endDateTime, 
      attendeeEmail, 
      attendeeName,
      timezone = 'Atlantic/Canary'
    } = req.body || {};

    // Input validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Valid title is required' });
    }
    
    if (!startDateTime || !endDateTime) {
      return res.status(400).json({ success: false, error: 'Start and end times are required' });
    }
    
    if (!attendeeEmail || typeof attendeeEmail !== 'string' || !attendeeEmail.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email address is required' });
    }
    
    if (!attendeeName || typeof attendeeName !== 'string' || attendeeName.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Attendee name is required' });
    }

    const calendar = await createCalendarClient();
    if (!calendar) {
      return res.status(500).json({ 
        success: false, 
        error: 'Calendar service not available' 
      });
    }

    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: startDateTime,
        timeZone: timezone,
      },
      end: {
        dateTime: endDateTime,
        timeZone: timezone,
      },
      attendees: [
        {
          email: attendeeEmail,
          displayName: attendeeName,
        }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours before
          { method: 'popup', minutes: 30 },     // 30 minutes before
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: PRIMARY_CALENDAR_ID,
      conferenceDataVersion: 1,
      sendNotifications: true,
      requestBody: event,
    });

    res.json({ 
      success: true, 
      eventId: response.data.id,
      hangoutLink: response.data.hangoutLink
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    
    // Provide user-friendly error messages
    let userMessage = 'Failed to create calendar event. Please try again later.';
    let statusCode = 500;
    
    if (error.code === 403) {
      userMessage = 'Calendar service permissions issue. Please contact support.';
    } else if (error.code === 404) {
      userMessage = 'Calendar not found. Please contact support.';
    } else if (error.code === 409) {
      userMessage = 'Time slot conflict. Please choose a different time.';
      statusCode = 409;
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      userMessage = 'Calendar service is temporarily unavailable. Please try again in a few minutes.';
      statusCode = 503;
    }
    
    res.status(statusCode).json({ 
      success: false, 
      error: userMessage
    });
  }
} 