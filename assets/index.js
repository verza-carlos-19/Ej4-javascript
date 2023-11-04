const contenedor = document.querySelector(".container");
const input = document.getElementById("input");
const form = document.getElementById("form");

const validPokemon = (num) => {
  if (num === "") {
    guardarLocalStorage({});
    return showError("Ingrese un numero");
  } else if (num < 1 || num > 1017) {
    guardarLocalStorage({});
    return showError(
      "No hay pokemon con ese id! </br> Ingrese un numero entre 1 y 1017"
    );
  }
};

const showError = (msg) => {
  contenedor.innerHTML = `
  <div class="cardError">
  <p class="error">${msg}</p>
  </div>
  `;
};
const guardarLocalStorage = async (pokemon) => {
  localStorage.setItem("ultimoPokemon", JSON.stringify(pokemon));
};
const renderPokemon = (json) => {
  const { name, types, weight, height, sprites } = json;
  const lista = document.createElement("ul");
  types.forEach((tipo) => {
    const typeItem = document.createElement("li");
    typeItem.classList.add(`${tipo.type.name}`);
    typeItem.textContent = tipo.type.name;
    lista.appendChild(typeItem);
  });
  const listatxt = lista.outerHTML;
  contenedor.innerHTML = `        
  <article class="card">
  <div class="info">
  <h2>${name}</h2>
    <p>tipos:</p>
    ${listatxt}
    <h3>${weight / 10}kg</h3>
    <h3>${height / 10}metros</h3>
  </div>
  <img src="${sprites.other.home.front_default}" alt="${name}" />
  </article>`;
};
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`we cannot found this pokemon`);
  }
};
const addPokemon = async (e) => {
  e.preventDefault();
  validPokemon(input.value);
  const pokemon = await getPokemon(input.value);
  renderPokemon(pokemon);
  guardarLocalStorage(pokemon);
};

function init() {
  form.addEventListener("submit", addPokemon);
  renderPokemon(JSON.parse(localStorage.getItem("ultimoPokemon")));
}

init();
