import type { IArticle } from '$lib/Shared/Models/IArticle';

export interface ICharacterRelease extends IArticle {
	metadataBaseUri: string;
	contractAddress: string;
	totalSupply: number;
	maxSupply: number;
	abi: object
}
