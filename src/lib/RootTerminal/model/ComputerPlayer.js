import { ComputerPlayerSettings } from './ComputerPlayerSettings';
import { Player } from './Player';
import { kit_types, RootKit } from './RootKit';
export class ComputerPlayer extends Player {
	constructor(name, settings = new ComputerPlayerSettings([])) {
		super(name ?? 'undefined');
		const kit = configureRootkit(settings);
		this.rootKit = kit;
		this.hitPoints = this.rootKit.getHitPoints();
		this.selectedCard = selectCardRandomly(this.rootKit.cards);
	}

	playCard() {
		this.selectedCard = selectCardRandomly(this.rootKit.cards);
		return super.playCard();
	}
}
function configureRootkit(settings) {
	const rand = Math.random();
	if (settings.type == kit_types.CYBERNETIC) {
		settings.maxSlots = 3;
	}

	settings.minSlots = settings.minSlots > settings.maxSlots ? settings.maxSlots : settings.minSlots;

	const slots = Math.floor(rand * (settings.maxSlots - settings.minSlots + 1)) + settings.minSlots;

	const kit = new RootKit(slots, settings.type);
	kit.cards = createRandomCards(
		settings.availableCards,
		slots,
		settings.minAttack,
		settings.maxAttack,
		settings.minDefense,
		settings.maxDefense
	);
	return kit;
}
function createRandomCards(availableCards, numOfSlots, minAttack, maxAttack, minDefense, maxDefense) {
	const cards = [];
	if (availableCards?.length === 0) return [];

	for (let i = 0; i < numOfSlots; i++) {
		let card;

		do {
			const attack = Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
			const defense = Math.floor(Math.random() * (maxDefense - minDefense + 1)) + minDefense;

			card = availableCards?.find(
				(card) => card.attack === attack && card.defense === defense && !cards.includes(card)
			);
		} while (!card);

		cards.push(card);
	}

	return cards;
}

function selectCardRandomly(cards) {
	const rand = Math.random();
	const possibleCards = cards.filter((c) => c.type != 'aug');
	return possibleCards.at(Math.floor(rand * possibleCards.length));
}
