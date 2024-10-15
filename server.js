import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import CORS

const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    res.json(data); // Send the quote data to the front-end
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});