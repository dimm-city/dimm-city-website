import type { IArticle } from '$lib/Shared/Models/IArticle';
export class Location implements IArticle {
	/**
	 *
	 */
	constructor() {
		this.name = '';
	}
	id: number;
	name: string;
	slug: string;
	description: string;
	imageUrl: string;
	videoUrl: string;
	thumbnailUrl: string;
	tags: string;
	type: string;
	author: string;
}
