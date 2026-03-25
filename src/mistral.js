const core = require('@actions/core');
const { Mistral } = require('@mistralai/mistralai');

async function run() {
  try {
    const prompt = core.getInput('prompt');
    const apiKey = core.getInput('api_key');
    const model = core.getInput('model');

    const client = new Mistral({ apiKey });

    // The sink from our CodeQL query!
    const completion = await client.chat.complete({
      model: model,
      messages: [{ role: 'user', content: prompt }]
    });

    core.setOutput('response', completion.choices[0].message.content);
    console.log(completion.choices[0].message.content);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
