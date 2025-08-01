const express = require('express');
const path = require('path'); // Node.js built-in module for working with file paths

const app = express();
const port = 3000; // You can choose any available port

// Serve static files from the 'public' directory
// This line makes all files in the 'public' directory accessible via their URL path
app.use(express.static(path.join(__dirname)));

// Define a route for the root URL ('/') that sends the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});