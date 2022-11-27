import type { IArticle } from '$lib/Shared/IArticle';

export interface ICharacterRelease extends IArticle {
	contractAddress: string;
	totalSupply: number;
	maxSupply: number;
	abi: object
}
