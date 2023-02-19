import { Player } from './Player';
import { RootKit } from './RootKit';

export class ComputerPlayer extends Player {
	constructor(name) {
		super(name ?? 'undefined');

		this.selectCardRandomly();
	}
	configureRootkit(minSlots = 1, maxSlots = 7, type = 'external') {
		const rand = Math.random();
		if (type == 'cybernetic') {
			maxSlots = 3;
		}
		
        minSlots = minSlots > maxSlots ? maxSlots : minSlots;

		const slots = Math.floor(rand * (maxSlots - minSlots + 1)) + minSlots;
		const kit = new RootKit(slots, type);
        while (kit.cards.length < slots) {
            let randomIndex = Math.floor(Math.random() * this.deck.cards.length);
            if (!kit.cards.includes(this.deck.cards[randomIndex])) {
              kit.cards.push(this.deck.cards[randomIndex]);
            }
          }
		this.rootKit = kit;
        this.hitPoints = this.rootKit.getHitPoints();
		this.selectCardRandomly();
	}

	selectCardRandomly() {
		const rand = Math.random();
		const possibleCards = this.deck.cards.filter((c) => c.type != 'aug');
		this.selectedCard = possibleCards.at(Math.floor(rand * possibleCards.length));
	}
	playCard() {
		this.selectCardRandomly();
		return super.playCard();
	}
}
