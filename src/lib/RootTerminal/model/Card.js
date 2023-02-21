// Define the possible cards

export class Card {
    constructor(slug, type, name, attack, defense, description = "") {
        this.slug = slug;
        this.name = name;
        this.type = type;
        this.kitType = "any";
        this.attack = attack;
        this.defense = defense;
        this.description = description;
    }
}



