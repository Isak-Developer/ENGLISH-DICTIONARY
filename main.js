const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
infoText = wrapper.querySelector(".info-text");
removeIcon = wrapper.querySelector(".search span");

// data function 
function data( result, word){
    if (result.title){ // if api returns the message of can't find word
        infoText.innerHTML = `cant find the meaning of <span>"${word}"</span>. please ,try to search for another word.`;
    } else{
       

        wrapper.classList.add("active");
        let syn = result[0].meanings[0].synonyms[0];
        let definitions = result[0].meanings[0].definitions[0],
       
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        console.log(syn);
        // passing particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        document.querySelector(".synonyms span").innerText = syn;


    }
     
}
// fetch api function 
function fetchApi(word){
    infoText.style.color="#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res =>res.json()).then(result =>data(result,word));
}
 

searchInput.addEventListener("keyup", e=>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});