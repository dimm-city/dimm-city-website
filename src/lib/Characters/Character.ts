export class Character {
	name: string;
	hp: number;
	ap: number;

	constructor(data: any) {
		this.name = data.name;
	}
}

export interface IAttribute {
	trait_type: string;
	value: string;
}

export interface ICharacter {
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
    noticeable: string;
	beliefs: string;
	flaws: string;
	dreams: string;
	story: string;

    //-----//
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
    abilities: ISummaryItem[]
}