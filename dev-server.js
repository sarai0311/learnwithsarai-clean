import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Global error handlers for unhandled errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit in development, just log
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit in development, just log
});

// Import API handlers (we'll need to adapt them)
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'sarai.syav@gmail.com';
// Support multiple calendars
const CALENDAR_IDS = process.env.GOOGLE_CALENDAR_IDS
  ? process.env.GOOGLE_CALENDAR_IDS.split(',').map((id) => id.trim()).filter(Boolean)
  : [CALENDAR_ID];

console.log('📅 Configured calendars:', CALENDAR_IDS);

// Create Google Calendar client using environment variables
const createCalendarClient = async () => {
  try {
    const { google } = await import('googleapis');
    
    // Use environment variables for authentication
    if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
      console.error('Google Calendar credentials not configured');
      return null;
    }

    // Create credentials object from environment variables
    const credentials = {
      type: 'service_account',
      client_email: SERVICE_ACCOUNT_EMAIL,
      private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });
    
    const authClient = await auth.getClient();
    return google.calendar({ version: 'v3', auth: authClient });
  } catch (error) {
    console.error('Error creating Google Calendar client:', error);
    return null;
  }
};

// Calendar availability endpoint
app.post('/api/calendar/availability', async (req, res) => {
  try {
    // Import the availability handler and adapt it
    const { format, addDays, startOfDay, endOfDay } = await import('date-fns');
    
    const TIME_SLOTS = [
      '13:00', '14:00', '15:00', '16:00', 
      '17:00', '18:00', '19:00',
      '20:00', '21:00', '22:00'
    ];
    
    // Fetch busy times from Google Calendar
    const getBusyTimes = async (startDate, endDate, timezone = 'Atlantic/Canary') => {
      const calendar = await createCalendarClient();
      if (!calendar) return [];

      try {
        console.log('🔍 Fetching busy times for calendars:', CALENDAR_IDS);
        const response = await calendar.freebusy.query({
          requestBody: {
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            timeZone: timezone,
            items: CALENDAR_IDS.map((id) => ({ id }))
          }
        });

        // Flatten busy arrays from all calendars
        const allBusy = [];
        for (const id of CALENDAR_IDS) {
          const calBusy = response.data.calendars?.[id]?.busy || [];
          console.log(`📋 Calendar ${id}: ${calBusy.length} busy slots`, calBusy);
          allBusy.push(...calBusy);
        }
        console.log('🔥 Total busy times:', allBusy.length);
        return allBusy.map(slot => ({
          start: slot.start || '',
          end: slot.end || ''
        }));
      } catch (error) {
        console.error('Error fetching busy times:', error.message);
        // Don't fail completely - return empty array so calendar still shows available slots
        return [];
      }
    };
    
    // Check if a time slot conflicts with busy times
    const isSlotBusy = (date, time, busyTimes) => {
      const slotStart = new Date(`${date}T${time}:00`);
      const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000); // 1 hour later

      return busyTimes.some(busy => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        
        // Check if there's any overlap
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    };
    
    const { days = 14, timezone = 'Atlantic/Canary', userTimezone = 'Atlantic/Canary' } = req.body;
    
    const availability = {};
    const startDate = startOfDay(new Date());
    const endDate = endOfDay(addDays(startDate, days));

    // Get busy times from Google Calendar
    const busyTimes = await getBusyTimes(startDate, endDate, timezone);
    
    // Generate availability for each day
    for (let i = 0; i < days; i++) {
      const date = addDays(startDate, i);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayOfWeek = date.getDay();
      
      // Skip weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        availability[dateKey] = {
          date: dateKey,
          slots: TIME_SLOTS.map(time => ({
            time,
            available: false,
            reason: 'weekend'
          }))
        };
        continue;
      }

      // Check each time slot
      const slots = TIME_SLOTS.map(time => {
        const slotDateTime = new Date(`${dateKey}T${time}:00`);
        
        // Skip past times
        if (slotDateTime < new Date()) {
          return { time, available: false, reason: 'outside-hours' };
        }
        
        // Check if slot is busy
        if (isSlotBusy(dateKey, time, busyTimes)) {
          return { time, available: false, reason: 'busy' };
        }
        
        return { time, available: true };
      });

      availability[dateKey] = {
        date: dateKey,
        slots
      };
    }

    res.json({ availability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    
    // Return graceful fallback instead of exposing internal errors
    const fallbackAvailability = {};
    const startDate = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();
      
      fallbackAvailability[dateKey] = {
        date: dateKey,
        slots: TIME_SLOTS.map(time => ({
          time,
          available: dayOfWeek !== 0 && dayOfWeek !== 6,
          reason: dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : undefined
        }))
      };
    }
    
    res.status(200).json({ 
      availability: fallbackAvailability,
      warning: 'Calendar service temporarily unavailable - showing basic availability'
    });
  }
});

// Calendar create event endpoint
app.post('/api/calendar/create-event', async (req, res) => {
  try {
    const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'sarai.syav@gmail.com';
    
    const { 
      title, 
      description, 
      startDateTime, 
      endDateTime, 
      attendeeEmail, 
      attendeeName,
      timezone = 'Atlantic/Canary'
    } = req.body;

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
      calendarId: CALENDAR_ID,
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
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  
  // Test the calendar connection on startup
  console.log('\n🔍 Testing Calendar Connection...');
  try {
    const calendar = await createCalendarClient();
    if (calendar) {
      const calendarList = await calendar.calendarList.list();
      console.log('✅ Google Calendar API connected successfully');
      console.log(`├── Accessible calendars: ${calendarList.data.items?.length || 0}`);
      
      const targetCalendar = process.env.GOOGLE_CALENDAR_ID;
      const foundCalendar = calendarList.data.items?.find(cal => cal.id === targetCalendar);
      
      if (foundCalendar) {
        console.log(`✅ Target calendar "${targetCalendar}" accessible`);
        console.log(`└── Access role: ${foundCalendar.accessRole}`);
      } else {
        console.log(`❌ Target calendar "${targetCalendar}" NOT accessible`);
        console.log('💡 SOLUTION: Share the calendar with the service account:');
        console.log(`   └── ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
      }
    }
  } catch (testError) {
    console.log('❌ Calendar connection test failed:', testError.message);
  }
  
  console.log('\n📋 Environment Status:');
  console.log('├── Service Account Email:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  console.log('├── Calendar ID:', process.env.GOOGLE_CALENDAR_ID);
  console.log('└── Service Account File:', SERVICE_ACCOUNT_PATH);
}); 