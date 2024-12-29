const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const author=document.getElementById('author');
const twitterBtn=document.getElementById('twitterBtn');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');


let apiQuotes=[];

function showLoader(){
    loader.hidden=false;
    quoteContainer.hidden=true;
 
}

function hideLoader(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
function tweetQuote(){
    const tweet=`https://x.com/compose/post?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(tweet,'_blank');
}
function newQuote(){
    showLoader();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // console.log(quote);
    hideLoader();
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');

    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    
    if(!quote.author){
        author.textContent='Unknown';
    }
    else{
        author.textContent=quote.author;
    }


}
async function getQuotes(){
    showLoader();
    const apiURL='https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try{
        const response=await fetch(apiURL);
        apiQuotes=await response.json();
    // console.log(apiQuotes);
    newQuote();
    }
    catch(error){
        alert('404 error');
    }
}
// Add eventlistner
twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',newQuote);
getQuotes();
// showLoader();



