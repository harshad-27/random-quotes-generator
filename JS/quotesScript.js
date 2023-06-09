const quote=document.querySelector('.quote'),
author=document.querySelector('.authorName'),
nextQuoteBtn=document.querySelector('.nextQuoteBtn'),
copyBtn=document.querySelector('#copyBtn'),
speechBtn=document.querySelector('#speechBtn'),
container=document.querySelector('.container'),
themeSwitcher=document.querySelector('.theme-switcher'),
themeImage=document.querySelector('.theme-switcher img');

//load theme from localstorage
window.addEventListener('load',()=>{
    const theme=localStorage.getItem("quotes-app-theme")
    if(theme && theme==='dark'){
        document.body.classList.add('dark')
        themeImage.src='./img/sun.png'
        themeImage.setAttribute('title','Light Mode')

    }
})

//change Theme
themeSwitcher.addEventListener('click',(e)=>{
    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')){
    themeImage.style.transform="rotate(90deg)";
    themeImage.src='./img/sun.png'
    localStorage.setItem("quotes-app-theme","dark")
    themeImage.setAttribute('title','Light Mode')
}else{
    localStorage.setItem("quotes-app-theme","light")
    themeImage.style.transform="rotate(0deg)";
    themeImage.src='./img/moon.png'
    themeImage.setAttribute('title','Dark Mode')
    }
})



//Get New Quote
async function getNewQuote(){
    nextQuoteBtn.innerText="Loading...";
    nextQuoteBtn.style.pointerEvents="none";
    let newQuote=await fetch("https://api.quotable.io/random")
    .then(response=>response.json())
    .then(data=>{
        quote.innerText=data.content;
        author.innerText=data.author;
        nextQuoteBtn.style.pointerEvents="all";
        nextQuoteBtn.innerText="Next Quote";
    })
    
}
getNewQuote();
nextQuoteBtn.addEventListener("click",getNewQuote);

// Copy Quote
copyBtn.addEventListener("click",()=>{
    navigator.clipboard.writeText(quote.innerText);
    container.classList.add('copied');
    setTimeout(()=>{
    container.classList.remove('copied');
    },1500)
})
//Speak Quote
speechBtn.addEventListener("click",()=>{

    container.classList.add('speaking');
    const synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(`${quote.innerText} by ${author.innerText}`);
    synth.speak(utterance);
    
  const speakInterval=  setInterval(()=>{
        if(!synth.speaking){
            container.classList.remove('speaking');
            clearInterval(speakInterval);
        }        
     },500)
})