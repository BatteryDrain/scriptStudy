const { ElevenLabsClient, stream } = require('@elevenlabs/elevenlabs-js');
const { Readable } = require('stream');

const express = require('express');
const path = require('path');
const fs = require('fs'); // Optional, for debugging

require('dotenv').config();


const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// const express = require('express');
// const path = require('path'); // Node.js built-in module for working with file paths

const app = express();
const port = process.env.PORT;

// Serve static files from the 'public' directory
// This line makes all files in the 'public' directory accessible via their URL path
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Define a route for the root URL ('/') that sends the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.json());

// The /listen endpoint
app.post('/listen', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Missing text');

  // Use Rachel as a stable default voice
  const voiceId = '21m00Tcm4TlvDq8ikWAM';
  const modelId = 'eleven_multilingual_v2';

  const chunks = splitTextIntoChunks(text);
  const audioBuffers = [];

  try {
    for (const chunkText of chunks) {
      console.log('Sending chunk:', chunkText.length, chunkText);

      const audioStream = await elevenlabs.textToSpeech.stream(voiceId, {
        text: chunkText,
        modelId: modelId,
      });

      const buffer = await streamToBuffer(audioStream);
      console.log('Chunk audio buffer size:', buffer.length);
      audioBuffers.push(buffer);
    }

    const fullAudio = Buffer.concat(audioBuffers);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', fullAudio.length);
    res.send(fullAudio);

  } catch (err) {
    console.error('Error during TTS:', err);
    res.status(500).send('Text-to-speech failed');
  }
});


// Helper to split text into ~300 character chunks
function splitTextIntoChunks(text, maxLength = 300) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  const chunks = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }

  if (current) chunks.push(current.trim());
  return chunks;
}

async function streamToBuffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});