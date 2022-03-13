import { displayMessage } from "../generalFunctions/displayMessage.js";
import { saveToken, saveUser } from "../generalFunctions/storage.js";
import { baseUrl } from "../settings.js";
import { takeToTop } from "../script.js";
import { removeMessage } from "../generalFunctions/removeMessage.js"
import { createMenu } from "../generalFunctions/createMenu.js"

takeToTop();
createMenu();




const form = document.querySelector("form");

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const usernameError = document.querySelector("#username-error");
const passwordError = document.querySelector("#password-error");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (!usernameValue) {
    displayMessage("warning", "Brukernavn mangler", "#username-error")
  }
  if (!passwordValue) {
    displayMessage("warning", "Passord mangler", "#password-error")
  }
  else if (usernameValue.length > 0 && passwordValue.length > 0) {
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";

    doLogin(usernameValue, passwordValue);

  }
}

async function doLogin(username, password) {

  const messageContainer = document.querySelector("#message-container");

  const url = baseUrl + "api/auth/local";
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },

  }
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)

    messageContainer.innerHTML = "";

    if (result.user) {
      displayMessage("success", "Pålogging vellykket!!", "#message-container");
      form.reset();
      saveToken(result.jwt);
      saveUser(result.user);
      removeMessage("#message-container")
      location.href = "/";

    }
    if (result.error) {
      displayMessage("danger", "Ugylig brukernavn/passord. Vennligst prøv igjen", "#message-container")
    }

  } catch (error) {
    console.log(error)
    displayMessage("danger", "Unknown error occured", "#message-container")
  }

}