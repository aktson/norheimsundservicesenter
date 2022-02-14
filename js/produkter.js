const productUrl = "http://localhost/norhss/wp-json/wc/store/products";

const tabsBtnContainer = document.querySelector(".tabs-btn-container");
const tabsBodyContainer = document.querySelector(".tabs-body-container");
const accordionContainer = document.querySelector(".accordion-container");


const fetchProducts = async () => {
    try {
        const response = await fetch(productUrl);
        const data = await response.json();

        data.forEach(product => {
            createHtmlBtn(product)
            createHtmlBody(product)
            createAccordion(product)
        });
    }
    catch (error) {
        console.log(error)
    }
}
fetchProducts();


function createHtmlBtn(result) {

    const receivedTag = result.tags[0].name.trim().toLowerCase();
    tabsBtnContainer.innerHTML += `
    <button class="nav-link p-4" id="v-pills-${receivedTag}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${receivedTag}" type="button" role="tab" aria-controls="v-pills-${receivedTag}" aria-selected="false">${result.name}</button>
`
}

function createHtmlBody(result) {
    const receivedTag = result.tags[0].name.trim().toLowerCase();
    tabsBodyContainer.innerHTML += `
        <div class="tab-pane fade show p-2 " id="v-pills-${receivedTag}" role="tabpanel" aria-labelledby="v-pills-${receivedTag}-tab">
            <h2>${result.name}</h2>
            <p >${result.description}</p>
            <figure class"mx-auto"><img src="${result.images[0].src}" alt="${result.images[0].alt}" class="img-fluid p-4 ">
        </div>
    `
}

function createAccordion(result) {

    const receivedTag = result.tags[0].name.trim().toLowerCase();

    accordionContainer.innerHTML += `
        <div class="accordion-item">
            <h3 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${receivedTag}" aria-expanded="false" aria-controls="${receivedTag}">
            ${result.name}
            </button>
            </h3>
            <div id="${receivedTag}" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
            <p>${result.description}</p>
            <img src="${result.images[0].src}" alt="${result.images[0].alt}" class="w-50 img-fluid">
        
            </div>
            </div>
        </div>
  `
}

