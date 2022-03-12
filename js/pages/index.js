import { baseUrl } from "../settings.js";
import data from "../tjenesterData.js"
import { createMenu } from "../generalFunctions/createMenu.js";
import { takeToTop } from "../script.js";


createMenu();
takeToTop();


//about section fetch
const carouselInner = document.querySelector("#carousel-inner");


(async function fetchPage() {
    const url = baseUrl + "api/pages/1";

    try {
        const response = await fetch(url);

        if (response.ok) {
            const results = await response.json();
            const data = results.data.attributes
            renderAboutSection(data)
        }


    }
    catch (error) {
        console.log(error)
    }

})();


function renderAboutSection(result) {
    const aboutContainer = document.querySelector("#about-container");

    // const result = results.attributes;
    console.log(result)
    aboutContainer.innerHTML += `  
        <div class="lc-block">
                <h2 >${result.title}</h2>
        </div>
        <div class="lc-block col-lg-6 mx-auto mb-4 line-break">
        <p class="lead line-break">${result.description}</p>
                
        </div>`
}




(async function fetchPosts() {
    const url = baseUrl + "api/posts?populate=*";

    try {
        const response = await fetch(url);

        if (response.ok) {
            const results = await response.json();
            createHtml(results.data)
        }

    }
    catch (error) {
        console.log(error)
    }

})();


function createHtml(results) {
    const carouselInner = document.querySelector("#carousel-inner");

    results.forEach((result) => {
        const post = result.attributes;
        const receivedImage = post.img.data.attributes.url

        carouselInner.innerHTML += ` <div class="carousel-item " data-bs-interval="10000" >
                                    <div class="ratio ratio-21x9" style="height:60vh;background:url('${receivedImage}')  center / cover no-repeat;background-color: rgba(0,0,0,0.5); background-blend-mode: overlay;">
                                        </div>
                                    <div class="carousel-caption  d-none d-md-block p-2 "  id="caption" >
                                    <h5 class="fs-3 mb-3">${post.title} </h5>
                                    <p >${post.description}</p>
                                    </div>
                                </div>
    `
    });
}

//tjenester section fetch data from tjenesteData.js
const tjensterContainer = document.querySelector("#tjenester-container");

data.forEach(item => {

    tjensterContainer.innerHTML += `<div class="col-md-4 mb-2" data-aos="flip-left" data-aos-duration="1000" data-id=${item.id}">
                                        <div class="p-lg-4 p-3 shadow-lg h-100 ">
                                        <div class="tjenster-section-icons">${item.icon}</div>
                                        <h4 class="my-3" >${item.title}</h4>
                                        <p >${item.description}</p>
                                    </div>`
})


