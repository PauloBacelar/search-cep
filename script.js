// Global variables
const button = document.querySelector("button");
const inputCEP = document.querySelector("input");
const result = document.querySelector("div#result");
const resultCEP = document.querySelector("h3#cep-result");
const resultState = document.querySelector("h3#state-result");
const resultCity = document.querySelector("h3#city-result");
const resultNeighborhood = document.querySelector("h3#neighborhood-result");
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

function APIDataIsInvalid(apiData) {
  return apiData.erro === true;
}

function showResults(apiData) {
  result.classList.remove("hide");

  resultCEP.textContent = `CEP: ${apiData.cep}`;
  resultState.textContent = `State: ${apiData.uf}`;
  resultCity.textContent = `City: ${apiData.localidade}`;
  resultNeighborhood.textContent = `Neighborhood: ${apiData.bairro}`;
  resultStreet.textContent = `Street: ${apiData.logradouro}`;
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
      if (APIDataIsInvalid(apiData)) {
        showErrorMessage();
        return;
      }

      console.log(apiData);
      showResults(apiData);
    });
});
