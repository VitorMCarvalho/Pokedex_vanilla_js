const pokeApi = {}

const convertPokeDetailToPokeClass = (pokeDetail) =>{
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map(types =>types.type.name);
    const [type] = types;
    
    pokemon.types = types;
    pokemon.type = type;
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    const stats = pokeDetail.stats.map(stats =>{
        return [stats.base_stat, stats.stat.name]
    })
    pokemon.stats = stats;
    const moves = pokeDetail.moves.map(moves => moves.move.name);
    pokemon.moves = moves;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then(response => response.json())
            .then(convertPokeDetailToPokeClass)

}

pokeApi.getPokemons = (offset, limit) =>{
    const baseUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(baseUrl)
        .then(response => response.json())
        .then(async body => body.results)
        .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
        .then(pokemonDetails => Promise.all(pokemonDetails))
        .then(pokemonDetail => pokemonDetail)
        .catch(error => {
            console.error(error);
        });
}

pokeApi.getPokemonByName = (name) =>{
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return fetch(baseUrl)
        .then(response => response.json())
        .then(convertPokeDetailToPokeClass)
        .then(pokemonDetail => pokemonDetail)
        .catch(error => {
            window.alert("Pokemon doesn't exists");
        });
}