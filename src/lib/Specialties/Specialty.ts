import type{  IArticle } from "../IArticle";
export class Specialty implements IArticle {
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
