import { createMenu } from "../generalFunctions/createMenu.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { takeToTop } from "../script.js";
import { baseUrl } from "../settings.js";
import { getUser, getToken } from "../generalFunctions/storage.js";




createMenu();
takeToTop();

const username = getUser();
const token = getToken();


const productUrl = baseUrl + "api/products?populate=*";

const tabsBtnContainer = document.querySelector(".tabs-btn-container");
const tabsBodyContainer = document.querySelector(".tabs-body-container");
const accordionContainer = document.querySelector(".accordion-container");


(async function fetchProducts() {
    try {
        const response = await fetch(productUrl);
        const result = await response.json();
        const products = result.data

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

    const tag = result.tag.toLowerCase().trim();

    let image = "../../images/not-found.png";
    let receivedImg = result.img.data.attributes.url;

    if (receivedImg) {
        image = receivedImg;
    }

    let btn = "";

    if (username) {
        btn = `<button class ="btn btn-danger btn-sm text-light" id="delete-button">Slett produkt</button>`

    }

    tabsBodyContainer.innerHTML += `
        <div class="tab-pane fade show p-4 " id="v-pills-${tag}" role="tabpanel" aria-labelledby="v-pills-${tag}-tab">
            <h2>${result.title}</h2> 
            <p >${result.description}</p>
            <span data-id=${results.id}>${btn}</span>
            <figure class="text-center  p-4" ><img src="${image}" alt="${result.title}" class="img-fluid  w-50 p-4" /></figure>
        </div> `


    const deleteBtns = document.querySelectorAll("#delete-button");

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", deletProduct);
    })

}
async function deletProduct(event) {

    console.log(event.target.parentElement.dataset.id);

    const id = event.target.parentElement.dataset.id;

    const url = baseUrl + `api/products/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    let doDelete = window.confirm("Er du sikker på at du vil slette?");

    if (doDelete) {
        try {

            const response = await fetch(url, options);

            if (response.ok) {
                const result = await response.json();
                location.reload();

            }

            if (response.error) {
                throw new Error("Klarte ikke å slette, vennligst prøv igjen!")
            }

        } catch (error) {
            console.log(error);
            displayMessage("danger", "Noe gikk galt!!", "#message-container")
        }

    }
}



//creates accordion for small screen
function createAccordion(results) {
    const result = results.attributes;

    const tag = result.tag.toLowerCase().trim();

    let image = result.img.data.attributes.url;

    if (!image) {
        image = "../../images/not-found.png";
    }


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

