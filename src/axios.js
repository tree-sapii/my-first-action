const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const prompt = core.getInput('prompt');
    const endpoint = core.getInput('endpoint') || 'http://localhost:8080/v1/chat/completions';

    const client = axios.create({
      baseURL: endpoint,
      headers: { 'Content-Type': 'application/json' }
    });

    // The sink from our CodeQL query!
    const response = await client.post('', {
      messages: [{ role: 'user', content: prompt }],
      temperature: 0
    });

    core.setOutput('response', response.data.choices[0].message.content);
    console.log(response.data.choices[0].message.content);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
