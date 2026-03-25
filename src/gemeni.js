const core = require('@actions/core');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  try {
    const prompt = core.getInput('prompt');
    const apiKey = core.getInput('api_key');
    const modelName = core.getInput('model');

    const client = new GoogleGenerativeAI(apiKey);
    const gemini = client.getGenerativeModel({ model: modelName });

    // The sink from our CodeQL query!
    const result = await gemini.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    core.setOutput('response', result.response.text());
    console.log(result.response.text());
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
