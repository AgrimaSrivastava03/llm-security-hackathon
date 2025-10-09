const express = require('express');
// Use global fetch available in Node.js >= 18 to avoid ESM/CommonJS interop issues

const app = express();
app.use(express.json());

// Azure OpenAI Configuration
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT; // e.g., https://your-resource.openai.azure.com/
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini';
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    ok: true, 
    provider: 'Azure OpenAI',
    deployment: AZURE_OPENAI_DEPLOYMENT,
    endpoint: AZURE_OPENAI_ENDPOINT ? 'configured' : 'missing'
  });
});

// Main query endpoint
app.post('/query', async (req, res) => {
  try {
    const query = req.body.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter' });
    }

    if (!AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'Azure OpenAI not configured',
        message: 'Please set AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_API_KEY environment variables'
      });
    }

    // Prepare Azure OpenAI request
    const azureUrl = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;
    
    const requestBody = {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses.'
        },
        {
          role: 'user',
          content: query
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    };

    console.log(`[Azure Shim] Sending query to Azure OpenAI: ${query.substring(0, 50)}...`);

    // Call Azure OpenAI
    const response = await fetch(azureUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Azure Shim] Azure OpenAI error: ${response.status} - ${errorText}`);
      return res.status(500).json({ 
        error: 'Azure OpenAI request failed',
        status: response.status,
        details: errorText
      });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'No response generated';

    console.log(`[Azure Shim] Received response from Azure OpenAI`);

    // Return in the same format as Target A
    res.json({
      prompt: query,
      answer: answer,
      provider: 'Azure OpenAI',
      deployment: AZURE_OPENAI_DEPLOYMENT
    });

  } catch (error) {
    console.error('[Azure Shim] Error:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
});

const PORT = 9001;
app.listen(PORT, () => {
  console.log(`[Azure Shim] Listening on :${PORT}`);
  console.log(`[Azure Shim] Target: Azure OpenAI (${AZURE_OPENAI_DEPLOYMENT})`);
  console.log(`[Azure Shim] Endpoint: ${AZURE_OPENAI_ENDPOINT || 'NOT CONFIGURED'}`);
});
