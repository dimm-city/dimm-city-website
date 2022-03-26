export class Character implements ICharacter {
	constructor(token: IToken = null) {
		if (token) this.importToken(token);
	}
	name: string;
	beliefs: string;
	flaws: string;
	dreams: string;
	story: string;
	token: IToken;
	age: number;
	height: number;
	weight: number;
	pronouns: string;
	eyes: string;
	skin: string;
	hair: string;
	vibe: string;
	clothing: string;
	mainImage: string;
	thumbnailImage: string;
	cybernetics: ISummaryItem[];
	race: IRaceSummaryItem;
	roles: ISummaryItem[] = [];
	currentLocation: ISummaryItem = { slug: '', name: '' };
	selectedAbilities: ISummaryItem[];
	items: ISummaryItem[];

	importToken(token: IToken) {
		if (!token) return;
		this.name = token.name;
		this.eyes = this._getAttributeValue(token, 'eyes');
		this.clothing = this._getAttributeValue(token, 'clothing');
		this.skin = this._getAttributeValue(token, 'body');
		this.token = token;
	}

	_getAttributeValue(token, attribKey): string {
		const result = token.attributes.find((a) => a.trait_type.toLowerCase() == attribKey.toLowerCase());
		return result ? result.value : '';
	}
}

export interface IAttribute {
	trait_type: string;
	value: string;
}

export interface IToken {
	compiler: string;
	release: string;
	artist: string;
	edition: number;
	date: number;
	name: string;
	description: string;
	dna: string;
	animation_url: string;
	attributes: IAttribute[];
	image: string;
	state: number;
	thumbnail_uri: string;
	fullresulotion_uri: string;
	id: number;
	tokenId: string;
}
export interface ICharacter {
	//TODO: add to strapi
	beliefs: string;
	flaws: string;
	dreams: string;
	story: string;
	token: IToken;

	//-----//
	name: string;
	age: number;
	height: number;
	weight: number;
	pronouns: string;
	eyes: string;
	skin: string;
	hair: string;
	vibe: string;
	clothing: string;
	mainImage: string;
	thumbnailImage: string;
	cybernetics: ISummaryItem[];
	race: IRaceSummaryItem;
	roles: ISummaryItem[];
	currentLocation: ISummaryItem;
	selectedAbilities: ISummaryItem[];
	items: ISummaryItem[];
}

export interface ISummaryItem {
	name: string;
	slug: string;
}

export interface IRaceSummaryItem extends ISummaryItem {
	abilities: ISummaryItem[];
}
