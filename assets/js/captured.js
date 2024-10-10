document.addEventListener('DOMContentLoaded', () => {
    const capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons')) || [];
    const capturedList = document.getElementById('captured-pokemon-list');

    if (capturedPokemons.length === 0) {
        capturedList.innerHTML = '<p>No Pokémon captured yet.</p>';
    } else {
        capturedPokemons.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'card m-2';
            pokemonCard.style.width = '150px';
            pokemonCard.innerHTML = `
                <img src="${pokemon.sprite}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">ID: ${pokemon.id}</p>
                </div>
            `;
            capturedList.appendChild(pokemonCard);
        });
    }
});
