import Pokemon from '../../models/Pokemon.js';
import { fetchPokemon, fetchGenerations, fetchPokemonByGeneration } from '../../services/apiService.js';
import { displayPokemon, createPokemonCard } from '../../components/pokemonCard.js';

document.getElementById('pokemon-search').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    const data = await fetchPokemon(query);
    if (data) {
        const pokemon = Pokemon.fromApiResponse(data);
        displayPokemon(pokemon);
    }
});

document.getElementById('pokemon-previous').addEventListener('click', async () => {
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID: ', ''));
    if (currentId > 1) {
        const data = await fetchPokemon(currentId - 1);
        if (data) {
            const pokemon = Pokemon.fromApiResponse(data);
            displayPokemon(pokemon);
        }
    }
});

document.getElementById('pokemon-next').addEventListener('click', async () => {
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID: ', ''));
    if (currentId < 1025) {
        const data = await fetchPokemon(currentId + 1);
        if (data) {
            const pokemon = Pokemon.fromApiResponse(data);
            displayPokemon(pokemon);
        }
    }
});

document.getElementById('pokemon-capture').addEventListener('click', async () => {
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID: ', ''));
    const data = await fetchPokemon(currentId);
    if (data) {
        const pokemon = Pokemon.fromApiResponse(data);
        capturePokemon(pokemon);
    }
});

function capturePokemon(pokemon) {
    let capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons')) || [];
    if (!capturedPokemons.some(p => p.id === pokemon.id)) {
        capturedPokemons.push({ id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default });
        localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
        alert(`${pokemon.name} has been captured!`);
    } else {
        alert(`${pokemon.name} is already captured!`);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const generations = await fetchGenerations();
    const generationSelect = document.getElementById('generation-select');
    generations.forEach((generation, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = generation.name;
        generationSelect.appendChild(option);
    });
});

document.getElementById('generation-select').addEventListener('change', async (event) => {
    const generationId = event.target.value;
    const pokemonListContainer = document.getElementById('pokemon-generation-list');
    pokemonListContainer.innerHTML = '';

    if (generationId) {
        const pokemonSpecies = await fetchPokemonByGeneration(generationId);
        pokemonSpecies.forEach(pokemon => {
            const pokemonCard = createPokemonCard(pokemon);
            pokemonListContainer.appendChild(pokemonCard);
        });
    }
});
