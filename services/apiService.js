const apiUrl = 'https://pokeapi.co/api/v2/';

export async function fetchPokemon(query) {
    try {
        const response = await fetch(`${apiUrl}pokemon/${query.toString().toLowerCase()}`);
        if (!response.ok) throw new Error('Pokémon not found');
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Pokémon not found');
    }
}

export async function fetchGenerations() {
    const response = await fetch(`${apiUrl}generation/`);
    const data = await response.json();
    return data.results;
}

export async function fetchPokemonByGeneration(generationId) {
    const response = await fetch(`${apiUrl}generation/${generationId}/`);
    const data = await response.json();
    return data.pokemon_species;
}
