// Test script to check career analysis API
const axios = require('axios');

const testProfile = {
  skills: ['JavaScript', 'React', 'Node.js'],
  interests: ['Web Development', 'Software Engineering'],
  education: 'Bachelor',
  workType: 'Full-time',
  salaryExpectation: '6-10 LPA',
  location: 'India'
};

async function testCareerAPI() {
  try {
    console.log('Testing career analysis API...');
    console.log('Profile:', JSON.stringify(testProfile, null, 2));
    
    const response = await axios.post(
      'https://my-career-plot.onrender.com/api/career',
      testProfile,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );
    
    console.log('\n✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('\n❌ Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
      console.error('Request:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testCareerAPI();
