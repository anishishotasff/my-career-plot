// Quick test script to verify configuration
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking My Career Plot Configuration...\n');

// Check backend .env
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(backendEnvPath)) {
  const envContent = fs.readFileSync(backendEnvPath, 'utf8');
  console.log('✅ Backend .env file exists');
  
  if (envContent.includes('GOOGLE_API_KEY=')) {
    const apiKey = envContent.match(/GOOGLE_API_KEY=(.+)/)?.[1]?.trim();
    if (apiKey && apiKey !== 'your_google_api_key_here') {
      console.log(`✅ Google API Key configured: ${apiKey.substring(0, 10)}...`);
    } else {
      console.log('⚠️  Google API Key not set (Mock AI will be used)');
    }
  }
} else {
  console.log('❌ Backend .env file missing');
}

// Check frontend Firebase config
const firebaseConfigPath = path.join(__dirname, 'frontend', 'src', 'config', 'firebase.ts');
if (fs.existsSync(firebaseConfigPath)) {
  const firebaseContent = fs.readFileSync(firebaseConfigPath, 'utf8');
  console.log('✅ Firebase config file exists');
  
  if (firebaseContent.includes('apiKey:') && !firebaseContent.includes('YOUR_')) {
    console.log('✅ Firebase API key configured');
  } else {
    console.log('❌ Firebase API key not configured');
  }
} else {
  console.log('❌ Firebase config file missing');
}

// Check Mock AI status
const geminiConfigPath = path.join(__dirname, 'backend', 'src', 'config', 'gemini.ts');
if (fs.existsSync(geminiConfigPath)) {
  const geminiContent = fs.readFileSync(geminiConfigPath, 'utf8');
  const useMockAI = geminiContent.includes('USE_MOCK_AI = true');
  
  if (useMockAI) {
    console.log('✅ Mock AI is ENABLED (using fake data for testing)');
  } else {
    console.log('⚠️  Mock AI is DISABLED (using real Google AI)');
  }
}

console.log('\n📋 Next Steps:');
console.log('1. Enable Google Sign-In in Firebase Console');
console.log('   → https://console.firebase.google.com/');
console.log('   → Authentication → Sign-in method → Enable Google');
console.log('\n2. Start the servers:');
console.log('   → Backend: cd backend && npm run dev');
console.log('   → Frontend: cd frontend && npm run dev');
console.log('\n3. Test at: http://localhost:5173');
