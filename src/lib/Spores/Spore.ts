export class Spore {	
	name: string;
    subtitle: string;
	slug: string;
	imageUrl: string;
	thumbnailUrl: string;
	description: string;
    introduction: string;
	villains: Array<string>;
	plots: Array<string>;
	goals: Array<string>;
	twists: Array<string>;
	customCss: string;
	constructor() {
		this.name = '';
        this.villains = new Array<string>();
        this.plots = new Array<string>();
        this.goals = new Array<string>();
        this.twists = new Array<string>();
	}
}
