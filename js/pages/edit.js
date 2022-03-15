import { createMenu } from "../generalFunctions/createMenu.js";
import { takeToTop } from "../script.js";
import { baseUrl } from "../settings.js";
import { getToken } from "../generalFunctions/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";


createMenu();
takeToTop();

const token = getToken();
if (!token) {
  location.href = "/";
}

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");
if (!id) {
  location.href = "/";
}
const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const titleError = document.querySelector("#title-error");
const descriptionError = document.querySelector("#description-error");


(async function fetchPage() {
  try {
    const url = baseUrl + `api/pages/${id}`

    const response = await fetch(url)
    const result = await response.json();

    title.value = result.data.attributes.title;
    description.value = result.data.attributes.description;

    console.log(result)
  } catch (error) {
    console.log(error)

  }

})();

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();

  if (!titleValue) {
    displayMessage("warning", "title mangler", "#title-error")
  }
  if (!descriptionValue) {
    displayMessage("warning", "beskrivelse mangler", "#description-error")
  }
  else if (titleValue.length > 0 && descriptionValue.length > 0) {
    titleError.innerHTML = "";
    descriptionError.innerHTML = "";

    doedit(titleValue, descriptionValue);

  }
}

async function doedit(title, description) {
  try {
    const url = baseUrl + `api/pages/${id}`;
    const data = JSON.stringify({ data: { title: title, description: description } })

    const options = {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }

    const response = await fetch(url, options);

    if (response.ok) {
      const result = await response.json();
      displayMessage("success", "Endring lagret", "#message-container");
      location.href = "/index.html";
    }



  }
  catch (error) {
    console.log(error)
    displayMessage("danger", "Noe gikk galt! Vennligst prøv senere", "#message-container")
  }
}