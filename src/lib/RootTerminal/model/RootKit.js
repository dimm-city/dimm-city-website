
export class RootKit {
    constructor(slots = 3, type = "external", cards = []) {
        this.slots = slots;
        this.type = type;
        this.cards = cards;
    }
    getHitPoints() {
        return this.slots * 5;
    }
}
