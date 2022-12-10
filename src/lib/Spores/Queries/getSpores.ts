import { Spore } from '../Spore';

export async function getSpores(): Promise<Array<Spore>> {
	const spore: Spore = new Spore();
	spore.slug = 'the-dark';
	spore.name = 'The Dark';
	spore.introduction = 'some stuff here';
	spore.subtitle = 'A Dimm City District';
	spore.villains = [
		'alligator sporos, Nightscale & his gang of thugs',
		'human transpiler named Maximillion',
		'outsider horror called Cliksnap',
		'crew of dark sporos known as "The Pentad"',
		'shape-shifting alien, Many-Colors Samm',
		'undead bird sporos wizard, Sperro'
	];
	spore.plots = [
		'extort small to mid-size business in the district',
		'blackmail big players active in the city',
		'terrify the district, feeding on their fear',
		'rob some of the biggest hot-spots in the city',
		'mind-control large sections of the populace',
		'animate the corpses of deceased sporos'
	];
	spore.goals = [
		"disrupt the gang's activities or leadership",
		'recover or destroy the blackmail data',
		'restore the safety of the district',
		'catch, kill, or drive the villains out of the district',
		'figure out a way to counteract the mind-control',
		'contain or destroy the undead leader'
	];
	spore.twists = [
		'they created a turf war with a powerful and secretive syndicate, The Small Song',
		'victims resort to rash decisions to avoid being caught in the scandals',
		'whole neighborhoods of the district are now a ghost town, which were once thriving',
		'business owners are hiring their own "security teams" made of gutterpunks and thugs',
		'the city infrastructure is suffering because of the mental absence of the citizens',
		'their control of the horde of minions they created is slipping'
	];
	return [spore];
}
