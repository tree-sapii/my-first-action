const core = require('@actions/core');
const Anthropic = require('@anthropic-ai/sdk');

async function run() {
  try {
    const prompt = core.getInput('prompt');
    const apiKey = core.getInput('api_key');
    const model = core.getInput('model');

    const client = new Anthropic({ apiKey });

    // The sink from our CodeQL query!
    const data = await client.messages.create({
      model: model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    core.setOutput('response', data.content[0].text);
    console.log(data.content[0].text);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
