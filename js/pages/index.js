import { baseUrl } from "../settings/config.js";
import data from "../tjenesterData.js"
import { createMenu } from "../generalFunctions/createMenu.js";
import { takeToTop } from "../script.js";


createMenu();
takeToTop();

const carouselInner = document.querySelector("#carousel-inner");


(async function fetchPosts() {

    const url = baseUrl + "wp/v2/posts?_embed";
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            createHtml(data)
        }

    }
    catch (error) {
        console.log(error)
    }

})()


function createHtml(results) {

    results.forEach((result) => {
        const receivedImage = result._embedded["wp:featuredmedia"][0].source_url;

        carouselInner.innerHTML += ` <div class="carousel-item " data-bs-interval="10000" >
                                    <div class="ratio ratio-21x9" style="height:60vh;background:url('${receivedImage}')  center / cover no-repeat;background-color: rgba(0,0,0,0.5); background-blend-mode: overlay;">
                                        </div>
                                    <div class="carousel-caption  d-none d-md-block p-2 "  id="caption" >
                                    <h5 class="fs-3 mb-3">${result.title.rendered} </h5>
                                    <p >${result.content.rendered}</p>
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