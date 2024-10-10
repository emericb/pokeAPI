export function displayPokemon(pokemon) {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = `
        <div>
            <h2 id="pokemon-name">${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p id="pokemon-id">ID: ${pokemon.id}</p>
            <p id="pokemon-weight">Weight: ${pokemon.weight}</p>
            <p id="pokemon-height">Height: ${pokemon.height}</p>
            <p id="pokemon-types">Types: ${pokemon.types.join(', ')}</p>
            <p id="pokemon-abilities">Abilities: ${pokemon.abilities.join(', ')}</p>
        </div>
    `;
}

export function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'card m-2';
    pokemonCard.style.width = '150px';
    pokemonCard.innerHTML = `
        <div class="card-body text-center">
            <h5 class="card-title">${pokemon.name}</h5>
        </div>
    `;
    return pokemonCard;
}
