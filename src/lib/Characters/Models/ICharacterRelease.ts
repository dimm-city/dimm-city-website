import type { IArticle } from '$lib/Shared/Models/IArticle';

export interface ICharacterRelease extends IArticle {
	icon: string;
	contract: {
		metadataBaseUri: string;
		contractAddress: string;
		totalSupply: number;
		maxSupply: number;
		abi: object | null;
		price: number | null;
	};
}

export class CharacterRelease implements ICharacterRelease {
	contract!: {
		metadataBaseUri: string;
		contractAddress: string;
		totalSupply: number;
		maxSupply: number;
		abi: object | null;
		price: number | null;
	};
	id = -1;
	name = '';
	slug = '';
	icon = "bi bi-question";
	description!: string;
	imageUrl!: string;
	videoUrl!: string;
	thumbnailUrl!: string;
	tags!: string;
	author!: string;
}
