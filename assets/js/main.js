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
    document.getElementById('pokemon-id').textContent = `ID :${id}`;
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
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID :', ''));
    if (currentId > 1) {
        const data = await fetchPokemon(currentId - 1);
        if (data) displayPokemon(data);
    }
});

document.getElementById('pokemon-next').addEventListener('click', async () => {
    const currentId = parseInt(document.getElementById('pokemon-id').textContent.replace('ID :', ''));
    if (currentId < 1010) {
        const data = await fetchPokemon(currentId + 1);
        if (data) displayPokemon(data);
    }
});
