const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

// Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Show data after Loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    } 
}


// Get Quote From an API

async function getQuote(){
    loading();

    const proxyUrl= 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const respone =  await fetch(proxyUrl + apiUrl);
        const data = await respone.json();
// If Quote length are high , then we reduce the size of quote. 
        if(data.quoteText.length > 120){
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }

        quoteText.innerText = data.quoteText;
// IF author is blank
        if(data.quoteAuthor === ""){
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = data.quoteAuthor;
        }

    complete();
        

    } catch(error){
        getQuote();
    }
}

function tweetQuote(){
    const qut =  quoteText.innerText;
    const athr =  authorText.innerText;

    const twitterURL =  `https://twitter.com/intent/tweet?text=${qut}-${athr}`
    window.open(twitterURL, '_blank')
}

// Event Listener
newQuoteBtn.addEventListener('click' , getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onLoad
getQuote();