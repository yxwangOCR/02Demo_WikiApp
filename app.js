// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const error = document.querySelector(".error");
const displayResult = document.querySelector(".result");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const searchInput = input.value.trim();

  if (searchInput === "") {
    error.innerHTML = "Veuillz entrer un terme de recherche 🥺 ";
    return;
  } else {
    error.textContent = "";
    wikiApiCall(searchInput);
  }
}

async function wikiApiCall(searchInput) {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  createCard(data.query.search);
}

function createCard(data) {
  if (!data.length) {
    error.textContent = "Wopsy, aucun résultat trouvé 😥";
    return;
  }
  data.forEach((result) => {
    const url = `http://en.wikipedia.org/?curid=${result.pageid}`;
    const card = document.createElement("div");
    card.classList.add("result-item");
    card.innerHTML = `
          <h2 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h2>
          <span class="result-link">
            <a href="${url}" target="_blank" rel="noopener">${url}</a>
          </span>
          <span class="result-snippet">${result.snippet}</span>
          `;
    displayResult.appendChild(card);
  });
}
