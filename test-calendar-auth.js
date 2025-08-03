import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

console.log('🔍 DIAGNOSING GOOGLE CALENDAR API SETUP\n');

console.log('📋 Configuration:');
console.log('├── Service Account:', SERVICE_ACCOUNT_EMAIL);
console.log('├── Calendar ID:', CALENDAR_ID);
console.log('├── Private Key Length:', PRIVATE_KEY ? PRIVATE_KEY.length : 'NOT SET');
console.log('└── Project:', 'spanish-sarai-calendar\n');

// Test 1: Create auth client
console.log('🔐 Test 1: Creating Authentication Client');
try {
  const auth = new google.auth.JWT(
    SERVICE_ACCOUNT_EMAIL,
    null,
    PRIVATE_KEY?.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/calendar'],
    null
  );
  
  console.log('✅ Auth client created successfully\n');
  
  // Test 2: Get access token
  console.log('🎫 Test 2: Getting Access Token');
  try {
    const token = await auth.getAccessToken();
    console.log('✅ Access token obtained successfully');
    console.log('├── Token type:', typeof token.token);
    console.log('└── Token length:', token.token?.length || 'N/A');
    console.log('');
  } catch (tokenError) {
    console.log('❌ Failed to get access token');
    console.log('Error:', tokenError.message);
    console.log('');
  }
  
  // Test 3: Create calendar client
  console.log('📅 Test 3: Creating Calendar Client');
  const calendar = google.calendar({ version: 'v3', auth });
  console.log('✅ Calendar client created\n');
  
  // Test 4: List calendars (basic permissions test)
  console.log('📝 Test 4: Listing Accessible Calendars');
  try {
    const calendarList = await calendar.calendarList.list();
    console.log('✅ Calendar list retrieved successfully');
    console.log('├── Accessible calendars:', calendarList.data.items?.length || 0);
    
    if (calendarList.data.items) {
      calendarList.data.items.forEach((cal, index) => {
        console.log(`├── ${index + 1}. ${cal.summary} (${cal.id})`);
        console.log(`│   └── Access Role: ${cal.accessRole}`);
      });
    }
    console.log('');
    
    // Check if target calendar is accessible
    const targetCalendar = calendarList.data.items?.find(cal => cal.id === CALENDAR_ID);
    if (targetCalendar) {
      console.log('✅ Target calendar found in accessible calendars');
      console.log(`├── Access Role: ${targetCalendar.accessRole}`);
      console.log(`└── Summary: ${targetCalendar.summary}\n`);
    } else {
      console.log('❌ Target calendar NOT found in accessible calendars');
      console.log('This indicates the calendar is not shared with the service account\n');
    }
  } catch (listError) {
    console.log('❌ Failed to list calendars');
    console.log('Error:', listError.message);
    console.log('Status:', listError.code);
    console.log('');
  }
  
  // Test 5: Direct calendar access
  console.log('🎯 Test 5: Direct Calendar Access Test');
  try {
    const calendarInfo = await calendar.calendars.get({
      calendarId: CALENDAR_ID
    });
    console.log('✅ Direct calendar access successful');
    console.log('├── Calendar summary:', calendarInfo.data.summary);
    console.log('├── Calendar timezone:', calendarInfo.data.timeZone);
    console.log('└── Calendar description:', calendarInfo.data.description || 'None');
    console.log('');
  } catch (directError) {
    console.log('❌ Direct calendar access failed');
    console.log('Error:', directError.message);
    console.log('Status:', directError.code);
    
    if (directError.code === 404) {
      console.log('💡 This suggests the calendar ID is incorrect or not accessible');
    } else if (directError.code === 403) {
      console.log('💡 This suggests permission issues - calendar not shared with service account');
    }
    console.log('');
  }
  
  // Test 6: FreeBusy query (the failing operation)
  console.log('📊 Test 6: FreeBusy Query Test');
  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: tomorrow.toISOString(),
        timeZone: 'Atlantic/Canary',
        items: [{ id: CALENDAR_ID }]
      }
    });
    
    console.log('✅ FreeBusy query successful');
    console.log('├── Calendars checked:', Object.keys(freeBusy.data.calendars || {}).length);
    console.log('└── Busy periods found:', freeBusy.data.calendars?.[CALENDAR_ID]?.busy?.length || 0);
    console.log('');
  } catch (freeBusyError) {
    console.log('❌ FreeBusy query failed');
    console.log('Error:', freeBusyError.message);
    console.log('Status:', freeBusyError.code);
    console.log('');
  }
  
} catch (authError) {
  console.log('❌ Failed to create auth client');
  console.log('Error:', authError.message);
  console.log('');
}

console.log('🔧 RECOMMENDED FIXES:');
console.log('');
console.log('1. CALENDAR SHARING:');
console.log(`   └── Share calendar "${CALENDAR_ID}" with "${SERVICE_ACCOUNT_EMAIL}"`);
console.log('   └── Give "Make changes to events" permission');
console.log('');
console.log('2. GOOGLE CLOUD CONSOLE:');
console.log('   └── Ensure Google Calendar API is enabled');
console.log('   └── Check service account has necessary roles');
console.log('');
console.log('3. CALENDAR ID:');
console.log('   └── Verify the calendar ID is correct');
console.log('   └── Try using the full email if it\'s different'); 