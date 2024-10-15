// api/quote.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    res.status(200).json(data);  // Send the quote data to the front-end
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
}
