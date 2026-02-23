const axios = require('axios');

async function testAssistant() {
  console.log('🧪 Testing AI Assistant API...\n');

  const testMessages = [
    'Hello!',
    'How do I write a good resume?',
    'What salary should I expect as a fresher?',
    'Help me prepare for an interview'
  ];

  for (const message of testMessages) {
    try {
      console.log(`📤 User: ${message}`);
      
      const response = await axios.post('http://localhost:5000/api/assistant/chat', {
        message: message,
        history: []
      });

      if (response.data.success) {
        console.log(`✅ Assistant: ${response.data.response.substring(0, 100)}...\n`);
      } else {
        console.log(`❌ Failed: ${response.data.message}\n`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
    }
  }

  console.log('✅ Test complete!');
}

testAssistant();
