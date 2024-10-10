const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

async function fetchPokemon(query) {
    try {
        const response = await fetch(`${apiUrl}${query.toString().toLowerCase()}`);
        if (!response.ok) throw new Error('Pokémon not found');
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Pokémon not found');
    }
}

function displayPokemon(data) {
    const { id, name, weight, height, sprites, types, abilities } = data;
    document.getElementById('pokemon-picture').src = sprites.front_default;
    document.getElementById('pokemon-id').textContent = `ID: ${id}`;
    document.getElementById('pokemon-name').textContent = name;
    document.getElementById('pokemon-weight').textContent = `Weight: ${weight}`;
    document.getElementById('pokemon-height').textContent = `Height: ${height}`;
    document.getElementById('pokemon-types').innerHTML = types.map(t => `<li>${t.type.name}</li>`).join('');
    document.getElementById('pokemon-abilities').innerHTML = abilities.map(a => `<li>${a.ability.name}</li>`).join('');
    document.getElementById('pokemon-previous').disabled = id === 1;
    document.getElementById('pokemon-next').disabled = id === 1025;
}

document.getElementById('pokemon-search').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    const data = await fetchPokemon(query);
    if (data) displayPokemon(data);
});

document.getElementById('pokemon-previous').addEventListener('click', async () => {
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID: ', ''));
    if (currentId > 1) {
        const data = await fetchPokemon(currentId - 1);
        if (data) displayPokemon(data);
    }
});

document.getElementById('pokemon-next').addEventListener('click', async () => {
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID: ', ''));
    if (currentId < 1025) {
        const data = await fetchPokemon(currentId + 1);
        if (data) displayPokemon(data);
    }
});

function capturePokemon(data) {
    let capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons')) || [];
    if (!capturedPokemons.some(pokemon => pokemon.id === data.id)) {
        capturedPokemons.push({ id: data.id, name: data.name, sprite: data.sprites.front_default });
        localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
        alert(`${data.name} has been captured!`);
    } else {
        alert(`${data.name} is already captured!`);
    }
}

document.getElementById('pokemon-capture').addEventListener('click', async () => {
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID: ', ''));
    const data = await fetchPokemon(currentId);
    if (data) capturePokemon(data);
});

async function fetchGenerations() {
    const response = await fetch('https://pokeapi.co/api/v2/generation/');
    const data = await response.json();
    return data.results;
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

async function fetchPokemonByGeneration(generationId) {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}/`);
    const data = await response.json();
    return data.pokemon_species;
}

document.getElementById('generation-select').addEventListener('change', async (event) => {
    const generationId = event.target.value;
    const pokemonListContainer = document.getElementById('pokemon-generation-list');
    pokemonListContainer.innerHTML = '';

    if (generationId) {
        const pokemonSpecies = await fetchPokemonByGeneration(generationId);
        pokemonSpecies.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'card m-2';
            pokemonCard.style.width = '150px';
            pokemonCard.innerHTML = `
                <div class="card-body text-center">
                    <h5 class="card-title">${pokemon.name}</h5>
                </div>
            `;
            pokemonListContainer.appendChild(pokemonCard);
        });
    }
});
