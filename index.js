const API_KEY = "abb098068ca640d1a3bc0a7ce28b38e8";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load",fetchNews("India"));

async function fetchNews(query){
    try{
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        bindNews(jsonResponse.articles);
    }catch(err){
        console.log("Error while fetching the News!!! ",err);
    }
}

function bindNews(articles){
    try{
        const temp = document.getElementById("template-card-container");
        const container = document.querySelector(".card-container");
        container.innerHTML = "";

        articles.forEach((article)=>{
            if(article.urlToImage == null)return;
            let cloneCard = temp.content.firstElementChild.cloneNode(true);
            fillDataInCard(cloneCard,article);
            container.appendChild(cloneCard);
        });
    }catch(err){
        console.log("Error while binding the News!!! ",err);
    }
}

function fillDataInCard(card,apiData){
    try{

        let cardImg = card.querySelector(".card-image>img");
        console.log(cardImg);
        let cardTitle = card.querySelector(".news-title");
        let cardPublish = card.querySelector(".publish-date");
        let cardDesc = card.querySelector(".news-description");
        const publishDate = new Date(apiData.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
        cardImg.src = apiData.urlToImage;
        cardTitle.innerText = apiData.title;
        cardDesc.innerText = apiData.description;
        cardPublish.innerText = `${apiData.source.name} . ${publishDate}`;

        card.addEventListener("click",()=>{
            const isClicked = confirm(`It will redirect you to ${apiData.source.name}`);
            if (isClicked){
                window.open(apiData.url,"_blank");
            }
        })
    }catch(err){
        console.log("Error while Filling the Card!!! ",err);
    }
}

let activeNav = null;
function navigateNews(){
    const nav = document.querySelector(".nav-links");
    nav.addEventListener("click",(e)=>{
        if (activeNav == e.target)return;

        if(activeNav != null){
            activeNav.classList.remove("active");
        }
        activeNav = e.target;
        activeNav.classList.add("active");
        const query = e.target.innerText;
        fetchNews(query);

    });
}

function searchNews(){
    const btn = document.querySelector(".search-button");
    btn.addEventListener("click",()=>{
        const searchTopic = document.querySelector(".news-input");
        if (!searchTopic.value)return;
        if(activeNav != null){
            activeNav.classList.remove("active");
        }
        fetchNews(searchTopic.value);
    })
}

function reload(){
    window.location.reload();
}
navigateNews();
searchNews();

