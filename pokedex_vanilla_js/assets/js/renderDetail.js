const pokeDetail = document.getElementById("contentDetail");
const params = (new URL(document.location)).searchParams;
const PokeName = params.get("name");
const backButton = document.getElementById("back");

const convertPokemonToDetailTable = (pokemon) =>{
    return `
    <h1 class="PokeNome">${pokemon.name}</h1>
    <div class="boxContent">
        <div class="presentation ${pokemon.type}">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <ol class="types typesDetail">
                <span class="typeLabel">Type(s)</span>
                ${pokemon.types.map(type=> `<li class="type ${type} typeDetail">${type}</li>`).join("")}
            </ol>
        </div>
        <div class="specifics">
            <span class="typeLabel">Move(s)</span>      
            <ol class="moves">
                ${pokemon.moves.map(move=> `<li class="move">${move}</li>`).join("")}
            </ol>
            <span class="typeLabel">Stats</span>
            <ol>
                ${pokemon.stats.map(stats=> `<li class="move">${stats[1]} - ${stats[0]}</li>`).join("")}
            </ol>
        </div>
    </div>
    <a href=".././index.html">
        <button type="button" class="button">Back to menu</button>
    </a>
    `
}


const loadPokeDetail = (name) =>{
    try {
        pokeApi.getPokemonByName(name)
            .then(pokemon =>{
                const pokeTable = convertPokemonToDetailTable(pokemon)
                pokeDetail.innerHTML=pokeTable;
                //poderia ter usado pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join()
            })
            .catch(error => {
                console.error(error);
            })
    } catch (error) {
        console.error(error);
    }
}

loadPokeDetail(PokeName)