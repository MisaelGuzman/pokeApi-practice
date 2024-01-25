const pokemonList = document.querySelector("#pokemonList");
const headerBottons = document.querySelectorAll(".btn-header");

const ini = 1;
const pokemonCant = 301;

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = ini; i <= pokemonCant; i++) {
  fetch(URL + i)
    .then((res) => res.json())
    .then((data) => showPokemon(data));
}

// Estudiar Fetch y promesas
function showPokemon(poke) {
  let types = poke["types"].map(
    (type) => `<p class="${type.type.name} type"> ${type.type.name} </p>`
  );
  types = types.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + poke.id;
  }

  if (pokeId.length === 2) {
    pokeId = "0" + poke.id;
  }
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
                <div class="pokemon-image">
                    <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                </div>
                    <div class="pokemon-info">
                        <div class="name-container">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-name">${poke.name}</h2>
                        </div>
                        <div class="pokemon-types">
                        ${types}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stats">${poke.height} m</p>
                            <p class="stats">${poke.weight} kg</p>
                    </div>
                </div>
    `;
  pokemonList.append(div);
}

headerBottons.forEach((botton) =>
  botton.addEventListener("click", (event) => {
    const bottonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = ini; i <= pokemonCant; i++) {
      fetch(URL + i)
        .then((res) => res.json())
        .then((data) => {
          if (bottonId === "all") {
            showPokemon(data);
          }

          const types = data.types.map((type) => type.type.name);
          console.log(types);
          if (types.some((type) => type.includes(bottonId))) {
            showPokemon(data);
          }
        });
    }
  })
);
