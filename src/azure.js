const core = require('@actions/core');
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');

async function run() {
  try {
    const prompt = core.getInput('prompt');
    const apiKey = core.getInput('api_key');
    const model = core.getInput('model');
    const endpoint = core.getInput('endpoint');

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    // The sink from our CodeQL query!
    const data = await client.getChatCompletions(model, [
      { role: 'user', content: prompt }
    ]);

    core.setOutput('response', data.choices[0].message.content);
    console.log(data.choices[0].message.content);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
