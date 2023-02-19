import { Deck } from './Deck';
import { Player } from './Player';
import { RootKit } from './RootKit';

export class ComputerPlayer extends Player {
	constructor(name) {
		super(name ?? 'undefined');
		this.deck = new Deck();
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
			const currentCard = this.deck.cards[randomIndex];
			if (!kit.cards.includes(currentCard) 
                && (currentCard.kitType == kit.type || currentCard.kitType == 'any')) {
				kit.cards.push(this.deck.cards[randomIndex]);
			}
		}
		this.rootKit = kit;
		this.hitPoints = this.rootKit.getHitPoints();
		this.selectCardRandomly();
	}

	selectCardRandomly() {
		const rand = Math.random();
		const possibleCards = this.rootKit.cards.filter((c) => c.type != 'aug');
		this.selectedCard = possibleCards.at(Math.floor(rand * possibleCards.length));
	}
	playCard() {
		this.selectCardRandomly();
		return super.playCard();
	}
}
