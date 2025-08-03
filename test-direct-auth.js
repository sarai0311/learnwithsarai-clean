import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🔍 TESTING DIRECT SERVICE ACCOUNT FILE AUTHENTICATION\n');

// Method 1: Direct service account file
const serviceAccountPath = '../spanish-sarai-calendar-4e3b82d56933.json';
console.log('📁 Method 1: Using service account file directly');

try {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  
  console.log('✅ Service account file loaded successfully');
  console.log('├── Project ID:', serviceAccount.project_id);
  console.log('├── Client Email:', serviceAccount.client_email);
  console.log('├── Private Key ID:', serviceAccount.private_key_id);
  console.log('└── Private Key Length:', serviceAccount.private_key.length);
  
  // Test auth with file
  console.log('\n🔐 Testing authentication with service account file:');
  
  const auth1 = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ['https://www.googleapis.com/auth/calendar'],
    null
  );
  
  try {
    const token1 = await auth1.getAccessToken();
    console.log('✅ Method 1: SUCCESS - Token obtained with service account file');
    console.log('├── Token length:', token1.token?.length);
    console.log('└── Token type:', typeof token1.token);
    
    // Test calendar access
    const calendar1 = google.calendar({ version: 'v3', auth: auth1 });
    
    try {
      const calendarList = await calendar1.calendarList.list();
      console.log('✅ Calendar list access successful');
      console.log('├── Accessible calendars:', calendarList.data.items?.length || 0);
      
      if (calendarList.data.items && calendarList.data.items.length > 0) {
        console.log('📅 Available calendars:');
        calendarList.data.items.forEach((cal, index) => {
          console.log(`├── ${index + 1}. ${cal.summary || 'Unnamed'} (${cal.id})`);
          console.log(`│   └── Access Role: ${cal.accessRole || 'Unknown'}`);
        });
      }
      
      // Check for target calendar
      const targetCalendar = process.env.GOOGLE_CALENDAR_ID;
      const foundCalendar = calendarList.data.items?.find(cal => cal.id === targetCalendar);
      
      if (foundCalendar) {
        console.log(`\n✅ Target calendar "${targetCalendar}" found!`);
        console.log(`├── Access Role: ${foundCalendar.accessRole}`);
        console.log(`└── Summary: ${foundCalendar.summary}`);
      } else {
        console.log(`\n❌ Target calendar "${targetCalendar}" NOT found in accessible calendars`);
        console.log('💡 This means the calendar needs to be shared with the service account');
      }
      
    } catch (calendarError) {
      console.log('❌ Calendar access failed:', calendarError.message);
      console.log('Status:', calendarError.code);
    }
    
  } catch (tokenError) {
    console.log('❌ Method 1: FAILED - Token error:', tokenError.message);
  }
  
} catch (fileError) {
  console.log('❌ Failed to load service account file:', fileError.message);
}

// Method 2: Google Auth from file path
console.log('\n📁 Method 2: Using GoogleAuth with keyFilename');

try {
  const auth2 = new google.auth.GoogleAuth({
    keyFilename: serviceAccountPath,
    scopes: ['https://www.googleapis.com/auth/calendar']
  });
  
  console.log('✅ GoogleAuth created with keyFilename');
  
  try {
    const authClient = await auth2.getClient();
    console.log('✅ Auth client obtained successfully');
    
    const calendar2 = google.calendar({ version: 'v3', auth: authClient });
    
    try {
      const calendarList2 = await calendar2.calendarList.list();
      console.log('✅ Method 2: Calendar access successful');
      console.log('└── Accessible calendars:', calendarList2.data.items?.length || 0);
    } catch (cal2Error) {
      console.log('❌ Method 2: Calendar access failed:', cal2Error.message);
    }
    
  } catch (client2Error) {
    console.log('❌ Method 2: Failed to get auth client:', client2Error.message);
  }
  
} catch (auth2Error) {
  console.log('❌ Method 2: Failed to create GoogleAuth:', auth2Error.message);
}

// Method 3: Environment variables with proper parsing
console.log('\n🔧 Method 3: Environment variables with corrected parsing');

try {
  const envEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const envKey = process.env.GOOGLE_PRIVATE_KEY;
  
  if (!envEmail || !envKey) {
    console.log('❌ Environment variables not set');
  } else {
    // Try different key parsing approaches
    const parsedKey = envKey.replace(/\\n/g, '\n');
    
    console.log('📋 Environment variables:');
    console.log('├── Email set:', !!envEmail);
    console.log('├── Key set:', !!envKey);
    console.log('├── Parsed key starts with BEGIN:', parsedKey.startsWith('-----BEGIN'));
    console.log('└── Parsed key ends with END:', parsedKey.endsWith('-----END PRIVATE KEY-----'));
    
    const auth3 = new google.auth.JWT(
      envEmail,
      null,
      parsedKey,
      ['https://www.googleapis.com/auth/calendar']
    );
    
    try {
      const token3 = await auth3.getAccessToken();
      console.log('✅ Method 3: SUCCESS - Environment variables work');
    } catch (token3Error) {
      console.log('❌ Method 3: Token error:', token3Error.message);
      
      // Try to debug the key format
      console.log('\n🔍 Debugging key format:');
      console.log('├── Key length:', parsedKey.length);
      console.log('├── First 50 chars:', parsedKey.substring(0, 50));
      console.log('├── Last 50 chars:', parsedKey.substring(parsedKey.length - 50));
      console.log('└── Contains proper line breaks:', parsedKey.includes('\n'));
    }
  }
  
} catch (env3Error) {
  console.log('❌ Method 3: Environment variable error:', env3Error.message);
}

console.log('\n🎯 NEXT STEPS:');
console.log('1. If Method 1 works: Use service account file directly');
console.log('2. If calendars found: Check calendar sharing permissions');
console.log('3. If no calendars: Check Google Cloud Console API settings');
console.log('4. If target calendar missing: Share calendar with service account email'); 