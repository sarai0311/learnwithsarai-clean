import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

console.log('🔍 TESTING PRIVATE KEY PARSING\n');

console.log('1. Raw key length:', PRIVATE_KEY ? PRIVATE_KEY.length : 'NOT SET');
console.log('2. Key starts with:', PRIVATE_KEY ? PRIVATE_KEY.substring(0, 50) + '...' : 'N/A');

// Test different parsing methods
console.log('\n🧪 Testing different parsing methods:');

// Method 1: Direct replacement
const method1 = PRIVATE_KEY?.replace(/\\n/g, '\n');
console.log('Method 1 (\\n replacement):');
console.log('├── Starts with BEGIN:', method1?.startsWith('-----BEGIN'));
console.log('├── Contains newlines:', method1?.includes('\n'));
console.log('└── First line:', method1?.split('\n')[0]);

// Method 2: JSON parse (for escaped strings)
try {
  const method2 = JSON.parse(`"${PRIVATE_KEY}"`);
  console.log('\nMethod 2 (JSON parse):');
  console.log('├── Starts with BEGIN:', method2?.startsWith('-----BEGIN'));
  console.log('├── Contains newlines:', method2?.includes('\n'));
  console.log('└── First line:', method2?.split('\n')[0]);
} catch (e) {
  console.log('\nMethod 2 (JSON parse): FAILED -', e.message);
}

// Method 3: Double replacement
const method3 = PRIVATE_KEY?.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n');
console.log('\nMethod 3 (double replacement):');
console.log('├── Starts with BEGIN:', method3?.startsWith('-----BEGIN'));
console.log('├── Contains newlines:', method3?.includes('\n'));
console.log('└── First line:', method3?.split('\n')[0]);

// Show what the key should look like
console.log('\n📝 Expected format:');
console.log('├── Should start with: -----BEGIN PRIVATE KEY-----');
console.log('├── Should end with: -----END PRIVATE KEY-----');
console.log('└── Should contain actual newlines (not \\n strings)');

// Test auth creation with different methods
console.log('\n🔐 Testing auth creation:');

import { google } from 'googleapis';

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

for (let i = 1; i <= 3; i++) {
  try {
    let keyToTest;
    switch(i) {
      case 1: keyToTest = method1; break;
      case 2: keyToTest = JSON.parse(`"${PRIVATE_KEY}"`); break;
      case 3: keyToTest = method3; break;
    }
    
    const auth = new google.auth.JWT(
      SERVICE_ACCOUNT_EMAIL,
      null,
      keyToTest,
      ['https://www.googleapis.com/auth/calendar'],
      null
    );
    
    // Try to get access token
    const token = await auth.getAccessToken();
    console.log(`✅ Method ${i}: SUCCESS - Token obtained`);
    break;
  } catch (error) {
    console.log(`❌ Method ${i}: FAILED - ${error.message}`);
  }
} 