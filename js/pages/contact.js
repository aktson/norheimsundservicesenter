import { createMenu } from "../generalFunctions/createMenu.js";
import { getToken } from "../generalFunctions/storage.js"
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { removeMessage } from "../generalFunctions/removeMessage.js";
import { renderFooter } from "../generalFunctions/renderFooter.js";


createMenu();
renderFooter();

const token = getToken();



const form = document.querySelector("#feedback");
const name = document.querySelector("#your-name");
const email = document.querySelector("#your-email");
const message = document.querySelector("#your-message");

// const email = document.querySelector("form.email");
const nameSpan = document.querySelector("#name-span");
const emailSpan = document.querySelector("#email-span");
const messageSpan = document.querySelector("#message-span");




// submit event on form with async function 1. first checks value and gives error if input are not filled and if statement checks all inputs matches the length if passed, then runs async function to post data

form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
    e.preventDefault();

    nameSpan.innerHTML = "";
    emailSpan.innerHTML = "";
    messageSpan.innerHTML = "";

    if (!checkLength(name.value, 4)) {
        displayMessage("warning", "*minimum 4 bokstaver", "#name-span")
    }
    if (!checkLength(message.value, 10)) {
        displayMessage("warning", "*minimum 15 bokstaver", "#message-span")
    }

    if (!checkValidEmail(email.value)) {
        displayMessage("warning", "*vennligst oppgi gyldig e-post", "#email-span")
    }

    if (checkLength(name.value, 5) && checkValidEmail(email.value) && checkLength(message.value, 15)) {
        const form = e.currentTarget;
        const url = form.action;

        try {

            const formData = new FormData(form)

            const response = await fetch(url, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                form.reset();

                displayMessage("success", "Melding Sendt! Vi tar kontakt!!", "#message-container")
                removeMessage("#message-container")
            }
            else {
                throw new Error("Something went wrong")
            }
        }
        catch (error) {
            console.log(error)
            displayMessage("danger", "Noe gikk galt!", "#message-container")
        }

    }

}



// // function to check length of entered characheters, takes two value first for input value and second for number of characters
function checkLength(input, len) {
    if (input.trim().length >= len) {
        return true
    }
}

// check for valid email
function checkValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
