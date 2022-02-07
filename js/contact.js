const form = document.querySelector("#feedback");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

// const email = document.querySelector("form.email");
const nameSpan = document.querySelector("#name-span");
const emailSpan = document.querySelector("#email-span");
const messageSpan = document.querySelector("#message-span");


// // function to check length of entered characheters, takes two value first for input value and second for number of characters
function checkLength(input, len) {
    if (input.trim().length >= len) {
        return true
    }
}


//function to show modal on success 

//function to show error first value to takes container(where to show error) and second to message you want to print
function showError(container, msg) {
    return container.innerHTML = `<p class= "error">${msg}</p>`
}

// function to check input value for email, first value is input, second is input container and third is message label tó display error and fourt for displayin error message.
function checkInputValue(input, inputContainer, labelContainer, msg) {
    if (!input) {
        labelContainer.innerHTML = "";
        labelContainer.innerHTML = `<p class= "error">${msg}</p>`
        inputContainer.style.border = "1px solid rgba(255,0,0,0.7)";

    } else {
        labelContainer.innerHTML = "";
        labelContainer.classList.remove("error");
        inputContainer.style.border = "1px solid rgba(0,255,0,0.8)";
    }
}
// submit event on form with async function 1. first checks value and gives error if input are not filled and if statement checks all inputs matches the length if passed, then runs async function to post data

form.addEventListener("submit", postFormData)

function postFormData(e) {
    e.preventDefault();

    checkInputValue(checkLength(name.value, 4), name, nameSpan, `*minimum 4 bokstaver`);
    checkInputValue(checkValidEmail(email.value), email, emailSpan, "*vennligst oppgi gyldig e-post");
    checkInputValue(checkLength(message.value, 15), message, messageSpan, `*minimum 15 bokstaver`);


    if (checkLength(name.value, 5) && checkValidEmail(email.value) && checkLength(message.value, 15)) {


        form.reset();
        displayMsg("Your message was sent successfully", "success-msg");
        removeSuccessMsg();

    }
}

function removeSuccessMsg() {
    setTimeout(() => {
        msgContainer.classList.add("hidden");
    }, 5000)
}
// global error container to show errors
const msgContainer = document.querySelector("#modal");
const closeModalBtn = document.querySelector("#modal-btn");


closeModalBtn.onClick = () => {
    msgContainer.classList.add("fade");
}

// function to shor error on error container
function displayMsg(msg, cls) {
    msgContainer.style.display = "block";
    msgContainer.classList.remove("fade")
    closeModalBtn.classList.remove("hidden");
    // if (!msg) {
    //     msgContainer.innerHTML = `<p class ="${cls}"> Opps..something went wrong please try something else</p>`
    // } else {
    //     msgContainer.innerHTML = `<p class ="${cls}"> ${msg}</p>`
    // }
}
// check for valid email
function checkValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}