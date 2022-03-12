import { createMenu } from "../generalFunctions/createMenu.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { takeToTop } from "../script.js";
import { baseUrl } from "../settings.js";

createMenu();
takeToTop();


const productUrl = baseUrl + "api/products?populate=*";

const tabsBtnContainer = document.querySelector(".tabs-btn-container");
const tabsBodyContainer = document.querySelector(".tabs-body-container");
const accordionContainer = document.querySelector(".accordion-container");


(async function fetchProducts() {
    try {
        const response = await fetch(productUrl);
        const result = await response.json();
        const products = result.data
        console.log(products)

        products.forEach(product => {
            createHtmlBtn(product)
            console.log(product)
            createHtmlBody(product)
            createAccordion(product)
        });
    }
    catch (error) {
        console.log(error)

    }
})();


//creates buttons
function createHtmlBtn(result) {

    const tag = result.attributes.tag.toLowerCase();

    tabsBtnContainer.innerHTML += `
    <button class="nav-link p-4" id="v-pills-${tag}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${tag}" type="button" role="tab" aria-controls="v-pills-${tag}" aria-selected="false">${result.attributes.title}</button>
`
}

//creates body for wide screen
function createHtmlBody(results) {

    const result = results.attributes;

    const tag = result.tag.toLowerCase();
    const image = result.img.data.attributes.url;

    tabsBodyContainer.innerHTML += `
        <div class="tab-pane fade show p-4 " id="v-pills-${tag}" role="tabpanel" aria-labelledby="v-pills-${tag}-tab">
            <h2>${result.title}</h2>
            <p >${result.description}</p>
            <figure class="text-center  p-4" ><img src="${image}" alt="${result.title}" class="img-fluid  w-50 p-4" /></figure>
        </div>
    `
}


//creates accordion for small screen
function createAccordion(results) {
    const result = results.attributes;

    const tag = result.tag.toLowerCase();
    const image = result.img.data.attributes.url;


    accordionContainer.innerHTML += `
        <div class="accordion-item">
            <h3 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${tag}" aria-expanded="false" aria-controls="${tag}">
            ${result.title}
            </button>
            </h3>
            <div id="${tag}" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
            <p>${result.description}</p>
           <figure class="text-center"> <img src="${image}" alt="${result.title}" class="w-100 img-fluid"></figure>
        
            </div>
            </div>
        </div>
  `
}

