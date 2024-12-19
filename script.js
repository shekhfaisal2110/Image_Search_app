const accessKey="Ysv6NSWsxXGTyavIMEdEBhSNlitANzSa2N0kY_4MK3Q"

const formE1=document.querySelector("form");
const inputE1=document.getElementById("Search-input");
const SearchResults=document.querySelector(".Search-results");
const ShowMore=document.getElementById("show-more-button");

let inputData="";
let page=1;

async function SearchImages(){
    inputData=inputE1.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response=await fetch(url);
    const data=await response.json();

    const results=data.results;

    if(page===1){
        SearchResults.innerHTML="";
    }

    results.map((result)=>{
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("Search-result");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        SearchResults.appendChild(imageWrapper);
    });

    page++;
    if(page>1){
        ShowMore.style.display="block";
    }
}

formE1.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    SearchImages();
});

ShowMore.addEventListener("click",(event)=>{
    SearchImages();
});
