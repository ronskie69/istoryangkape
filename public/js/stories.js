const cards = document.querySelectorAll('.card');
const next = document.getElementById("next")
const prev = document.getElementById("prev")


//isotope

let storyFilters = document.querySelectorAll('.story_filter')
let filterer

const story_filters = document.querySelector('.story_filters');
const storiesContainer = document.querySelector('.stories-container');
let isotopeStory = new Isotope(storiesContainer, {
    itemSelector: '.card-story'
})

story_filters.addEventListener("change",function(e){
    filterer = e.target.value
    isotopeStory.arrange({
        filter: filterer
    })
})



// cards


if(cards !== null) {
    cards.forEach(card => {
        let toggle_accordions = card.querySelectorAll('.toggle-accordion');
        let accordionate = card.querySelectorAll('.accordionate');
        let cardHeight = card.getBoundingClientRect().height;
        console.log(cardHeight)

        toggle_accordions.forEach(togglers => {
            if(cardHeight > 210){
                togglers.style.display = "block"
            } else {
                togglers.style.display = "none"
            }

            togglers.addEventListener('click', async function(){
                if(togglers.innerHTML === "Read More"){
                    togglers.innerHTML = "Show Less"
                } else {
                    togglers.innerHTML = "Read More"
                }
                accordionate.forEach(accordions => {
                    accordions.classList.toggle('activeReadable');
                });
                isotopeStory.arrange({
                    filter: filterer ? filterer : '*'
                })
            });
        })
    });
}

if(prev){
    prev.addEventListener('click', function(e){
        e.preventDefault()
        let page = parseInt(prev.getAttribute("data-page"))
        page--;
        page = page <= 0? 1: page
        console.log(page)
        window.location.href = "https://istoryangkape.herokuapp.com/istorya/stories/" + page;
    })
}

if(next){
    next.addEventListener('click', function(e){
        e.preventDefault()
        let page = parseInt(next.getAttribute("data-page"))
        page++;
        console.log(page)
        window.location.href = "https://istoryangkape.herokuapp.com/istorya/stories/" + page;
    })
}


//share on socmed and detect url in story
let storiesTwt = document.querySelectorAll(".card .share_twt");
let cardStory = document.querySelectorAll(".card .story_text");
let cardAuthor = document.querySelectorAll(".card .sharer");



function urlify(text) {
    const urlRegex = /(?:(?:https?:\/\/)|(?:www\.))[^\s]+/g;
    return text.replace(urlRegex, function(url) {
      return `<a target="_blank" class ="detected-link" href="${url}">${url}</a>`;
    })
}

cards.forEach((card,i) => {
    console.log(urlify(cardStory[i].innerHTML))
    cardStory[i].innerHTML = urlify(cardStory[i].innerHTML)
})


storiesTwt.forEach((val, key)=>{
    storiesTwt[key].addEventListener('click', function(e){
        let twtUri = "https://twitter.com/intent/tweet?text="+encodeURIComponent(cardStory[key].innerHTML+" - "+cardAuthor[key].innerHTML);
        this.setAttribute("href", twtUri);
    })
})