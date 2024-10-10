class Pokemon {
    constructor(id, name, weight, height, sprites, types, abilities) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.sprites = sprites;
        this.types = types;
        this.abilities = abilities;
    }

    static fromApiResponse(data) {
        return new Pokemon(
            data.id,
            data.name,
            data.weight,
            data.height,
            data.sprites,
            data.types.map(t => t.type.name),
            data.abilities.map(a => a.ability.name)
        );
    }
}

export default Pokemon;
