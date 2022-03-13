import { createMenu } from "../generalFunctions/createMenu.js";
import { takeToTop } from "../script.js";
import { baseUrl } from "../settings.js";
import { getToken } from "../generalFunctions/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { removeMessage } from "../generalFunctions/removeMessage.js";

createMenu();
takeToTop();


const token = getToken();


if (!token) {
  location.href = "/";
}

const form = document.querySelector("form");

const title = document.querySelector("#title");
const img = document.querySelector("#img");
const description = document.querySelector("#description");


const titleError = document.querySelector("#title-error");
const descriptionError = document.querySelector("#description-error");
const imgError = document.querySelector("#img-error");


form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();


  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const imgValue = img.value;


  if (!titleValue) {
    displayMessage("warning", "title mangler", "#title-error")
  }
  if (!descriptionValue) {
    displayMessage("warning", "beskrivelse mangler", "#description-error")
  }

  if (!imgValue) {
    displayMessage("warning", "bilde mangler", "#img-error")
  }

  else if (titleValue.length > 0 && descriptionValue.length > 0 && imgValue) {
    titleError.innerHTML = "";
    descriptionError.innerHTML = "";
    imgError.innerHTML = "";

    addCampaign(titleValue, descriptionValue, imgValue,)

  }
}

async function addCampaign(title, description, imgValue) {


  try {
    const formData = new FormData(form);
    formData.append("files", imgValue)

    const options = {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }
    const url = baseUrl + `api/upload`;
    const response = await fetch(url, options);
    const result = await response.json();

    const imgId = result[0].id;

    const data = JSON.stringify({ data: { title: title, description: description, img: imgId } })

    const optionsProduct = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }

    }
    const productUrl = baseUrl + `api/posts`;
    const res = await fetch(productUrl, optionsProduct);

    if (res.ok) {
      const results = await res.json();
      displayMessage("success", "Kampanje lagt til!!", "#message-container");
      removeMessage("#messge-container")
      form.reset();
    }
    if (res.error) {
      throw new Error("Klarte ikke legge til, vennligst prøv igjen!")
    }

  }

  catch (error) {
    console.log(error)
    displayMessage("danger", "Noe gikk galt! Vennligst prøv senere", "#message-container")
  }
}