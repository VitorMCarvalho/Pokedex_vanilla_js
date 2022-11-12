const limit = 20;
let offset = 0;

const pokemonList = document.getElementById("pokemonList");
const buttonNext = document.getElementById("buttonNext");
const buttonBack = document.getElementById("buttonBack");
const buttonReset = document.getElementById("buttonReset");
const buttonName = document.getElementById("buttonSearch");

const convertPokemonToListItem = (pokemon) =>{
    return `
    <a href=".././pokeDetails.html?name=${pokemon.name}">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="nameCrypto">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type=> `<li class="type ${type}">${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>
    </a>`
}

const loadMorePoke = (offset, limit) =>{
    try {
        pokeApi.getPokemons(offset,limit)
            .then((pokemons = []) =>{
                const concatedItens = pokemons
                                        .map(pokemon=>convertPokemonToListItem(pokemon))
                                        .reduce((total, next)=>total + next);
                pokemonList.innerHTML=concatedItens;
                //poderia ter usado pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join()
            })
            .catch(error => {
                console.error(error);
            })
    } catch (error) {
        console.error(error);
    }
}

const findPokemonByName = (name) =>{
    try{
        pokeApi.getPokemonByName(name)
            .then(pokemon =>{
                const poke = convertPokemonToListItem(pokemon);
                pokemonList.innerHTML = poke;
            })
    }catch(error){
        console.error(error);
    }
}

loadMorePoke(offset,limit);

buttonNext.addEventListener("click",()=>{
    offset+=limit;
    loadMorePoke(offset, limit);
})

buttonBack.addEventListener("click", ()=>{
    if(offset>0){
        offset-=limit;
        loadMorePoke(offset, limit);
    }
})

buttonReset.addEventListener("click", ()=>{
    offset=0;
    loadMorePoke(offset, limit);
})

buttonName.addEventListener("click", ()=>{
    const input = document.getElementById("pokeName").value.toLowerCase();
    if(input!= ""){
        findPokemonByName(input);
    }
})