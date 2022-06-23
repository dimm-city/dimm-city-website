import type{  IArticle } from "../IArticle";
export class JournalEntry implements IArticle {
    /**
     *
     */
    constructor() {        
        this.name = "";
    }
	id: number;
	name: string;
	slug: string;
	description: string;
	imageUrl: string;
	videoUrl: string;
	thumbnailUrl: string;
}
