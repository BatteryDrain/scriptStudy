const { ElevenLabsClient, stream } = require('@elevenlabs/elevenlabs-js');
const { Readable } = require('stream');

const express = require('express');
const path = require('path');

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

app.post('/listen', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Missing text');

  const chunks = splitTextIntoChunks(text);
  const audioBuffers = [];

  try {
    for (const chunkText of chunks) {
      console.log('Sending:', chunkText);
      const audioStream = await elevenlabs.textToSpeech.stream('21m00Tcm4TlvDq8ikWAM', {
        text: chunkText,
        modelId: 'eleven_multilingual_v2',
      });

      // const buffer = await streamToBuffer(audioStream);
      // audioBuffers.push(buffer);
      fs.writeFileSync('test_output.mp3', result.audio);

      console.log('Chunk audio buffer size:', buffer.length);
    }

    // Send as single audio response
    const fullAudio = Buffer.concat(audioBuffers);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', fullAudio.length);
    res.send(fullAudio);

  } catch (err) {
    console.error('Streaming error:', err);
    res.status(500).send('Failed to stream audio');
  }
});

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

voiceId = "21m00Tcm4TlvDq8ikWAM";

async function textToSpeech(text) {
  const audioStream = await elevenlabs.textToSpeech.stream(voiceId, {
    text: "Simple text to speech example",
    modelId: 'eleven_multilingual_v2',
  });
  // option 1: play the streamed audio locally
  await stream(audioStream);
  // option 2: process the audio manually
  // for await (const chunk of audioStream) {
  //   console.log(chunk);
  // }
}