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

const proxyUrl = 'https://api.allorigins.win/get?url=';
const apiUrl = 'http://localhost:3000/api/quote';

async function getQuote() {
  try {
    loading();

    const response = await fetch(apiUrl);
    const data = await response.json();

    const quoteData = data[0]; // Assuming ZenQuotes API returns an array

    if (!quoteData.a) {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = quoteData.a;
    }

    if (quoteData.q.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quoteData.q;
    complete();
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteText.innerText = 'Failed to fetch a new quote. Please try again later.';
    complete();
  }
}



// Get Quote From API


// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  newQuoteBtn.addEventListener('click', () => {
    console.log('New Quote button clicked');
    getQuote();
  });
  twitterBtn.addEventListener('click', tweetQuote);
});

// On Load
getQuote();
