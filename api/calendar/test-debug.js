export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Step 1: Function started');
    
    // Test environment variables
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const impersonateEmail = process.env.IMPERSONATE_USER_EMAIL;
    
    console.log('Step 2: Environment variables check');
    console.log('Service Account Email:', serviceAccountEmail ? 'SET' : 'MISSING');
    console.log('Private Key:', privateKey ? 'SET' : 'MISSING');
    console.log('Calendar ID:', calendarId || 'DEFAULT');
    console.log('Impersonate Email:', impersonateEmail ? 'SET' : 'MISSING');
    
    // Test imports
    console.log('Step 3: Testing imports');
    const { google } = await import('googleapis');
    console.log('googleapis imported successfully');
    
    const { zonedTimeToUtc } = await import('date-fns-tz');
    console.log('date-fns-tz imported successfully');
    
    // Test auth creation
    console.log('Step 4: Testing auth creation');
    if (!serviceAccountEmail || !privateKey || !impersonateEmail) {
      throw new Error('Missing required environment variables');
    }
    
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
      subject: impersonateEmail
    });
    
    console.log('Auth created successfully');
    
    // Test calendar client
    console.log('Step 5: Testing calendar client');
    const calendar = google.calendar({ version: 'v3', auth });
    console.log('Calendar client created successfully');
    
    return res.json({
      success: true,
      message: 'All tests passed',
      timestamp: new Date().toISOString(),
      config: {
        hasServiceAccount: !!serviceAccountEmail,
        hasPrivateKey: !!privateKey,
        calendarId: calendarId || 'hola@learnwithsarai.com',
        hasImpersonateEmail: !!impersonateEmail
      }
    });
    
  } catch (error) {
    console.error('Debug test failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}