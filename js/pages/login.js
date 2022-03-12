import { displayMessage } from "../generalFunctions/displayMessage.js";
import { saveToken, saveUser } from "../generalFunctions/storage.js";
import { baseUrl } from "../config.js";
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

  const url = baseUrl + "jwt-auth/v1/token";
  const data = JSON.stringify({ username: username, password: password });

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

    if (result.user_email) {
      displayMessage("success", "Login successful", "#message-container");
      form.reset();
      saveToken(result.token);
      saveUser(result.user_nicename);
      removeMessage("#message-container")
      location.href = "/";

    }
    if (result.code) {
      displayMessage("danger", "Ukjent brukernavn/passord. Vennligst prøv igjen", "#message-container")
    }

  } catch (error) {
    console.log(error)
    displayMessage("danger", "Unknown error occured", "#message-container")
  }

}