const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  loading();
  const apiKey = '0GqmozvnJmQB2tb6/rwkxw==hrW7u16tWthDYbfd'; // Replace with your API key
  const category = 'happiness'; // You can change this to another category if needed
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching quote');
    }

    const data = await response.json();
    const quoteData = data[0]; // Assuming the API returns an array with one object

    // Check if Author field is blank and replace it with 'Unknown'
    if (quoteData.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = quoteData.author;
    }

    // Dynamically reduce font size for long quotes
    if (quoteData.quote.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quoteData.quote;
    // Stop Loading, Show Quote
    complete();
  } catch (error) {
    console.error('There was a problem fetching the quote:', error);
    getQuote(); // Retry on error
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
