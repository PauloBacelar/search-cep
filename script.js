// Global variables
const button = document.querySelector("button");
const inputCEP = document.querySelector("input");
const resultCEP = document.querySelector("h3#cep-result");
const resultState = document.querySelector("h3#state-result");
const resultCity = document.querySelector("h3#city-result");
const resultStreet = document.querySelector("h3#street-result");
const errorMessage = document.querySelector("div#error");

// Functions
function getInput() {
  return inputCEP.value;
}

function checkInput(cepInput) {
  return cepInput.length === 9;
}

function showErrorMessage() {
  errorMessage.classList.remove("hide");
}

function cepToNum(cepString) {
  return Number(cepString.split("-").join(""));
}

// Main function
button.addEventListener("click", () => {
  const cepString = getInput();

  if (!checkInput(cepString)) {
    showErrorMessage();
    return;
  }

  const cepNumbers = cepToNum(cepString);
  const api = `https://viacep.com.br/ws/${cepNumbers}/json/`;
  fetch(api)
    .then((jsonFile) => {
      return jsonFile.json();
    })
    .then((apiData) => {
      console.log(apiData);
    });
});
