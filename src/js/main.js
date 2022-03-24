const boton = document.getElementById("boton");
const pokePhoto = document.getElementById("pokeImg");
const pokeNameApi = document.getElementById("name");
const containerMoves = document.getElementById("moves");
const pokeTypeApi = document.getElementById("type");
const containerHabilities = document.getElementById("habilities");


const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("pokeName");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        pokeImage("https://canalpokemon.files.wordpress.com/2008/11/kawax-pokeball-3097.png?w=256&h=256");
        containerMoves.innerHTML=''
        containerHabilities.innerHTML=''
        pokeNameApi.textContent=''
        pokeTypeApi.textContent=''
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        let name = data.name;
        addName(name);
        let moves = data.moves;
        addMovimiento(moves);
        let type = data.types[0].type.name;
        addType(type);
        let habilities = data.stats;
        addHabilities(habilities);
      }
    });
};

const pokeImage = (url) => {
  pokePhoto.src = url;
};

const addName = (name) => {
  pokeNameApi.textContent = `Nombre: ${name}`;
};

const addType = (type) => {
  pokeTypeApi.textContent = `Tipo: ${type}`;
};

const addMovimiento = (moves) => {
  containerMoves.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const textMoves = document.createElement("li");
    textMoves.innerHTML = `${moves[i].move.name}`;
    containerMoves.appendChild(textMoves);
  }
};

let addHabilities = (habilities) => {
  containerHabilities.innerHTML = "";
  habilities.forEach((habilitie) => {
    const textHabilities = document.createElement("li");
    textHabilities.innerHTML = `${habilitie.stat.name}:  <span>${habilitie.base_stat}</span>`;
    containerHabilities.appendChild(textHabilities);
  });
};

boton.addEventListener("click", fetchPokemon);

