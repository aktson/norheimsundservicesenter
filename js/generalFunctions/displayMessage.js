export function displayMessage(msgType, msg, container) {
  const element = document.querySelector(container);

  element.innerHTML = `<div class="bg-${msgType} p-2 w-auto text-light text-center my-2">${msg}</div>`
}

export function checkLength(inputValue, len) {
  if (inputValue.trim().length >= len) {
    return true;
  }

}