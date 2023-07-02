import { getDistricts } from '$lib/Locations/getDistricts';
import { getSpecialties } from '$lib/Specialties/getSpecialties';

const _systemMap = {
	pages: [
		{
			name: '',
			slug: ''
		}
	]
};
const getSystemMap = async () => {
	_systemMap.pages = [
		{
			name: 'Dashboard',
			slug: '',
			children: []
		},
		{
			name: 'Op Console',
			slug: 'console',
			children: []
		},
		{
			name: 'Citizen Files',
			slug: 'citizens',
			children: []
		},
		{
			name: 'Locations',
			slug: 'locations',
			children: await getDistricts()
		},
		{
			name: 'Specialties',
			slug: 'specialties',
			children: await getSpecialties()
		},
		{
			name: 'Journal Entries',
			slug: 'journal-entries',
			children: [] //await getJournalEntries()
		},
		{
			name: 'Spores',
			slug: 'spores'
		},
		{
			name: 'Tools',
			slug: 'tools',
			children: [
				{
					name: 'Cyberwar',
					slug: 'cyberwar'
				},
				{
					name: 'Dice',
					slug: 'dice'
				}
			]
		},
		{
			name: 'About',
			slug: 'about',
			children: [
				{
					name: 'Change Log',
					slug: 'change-log'
				},
				{
					name: 'System Stats',
					slug: 'stats'
				},
				{
					name: 'Dependencies and Integrations',
					slug: 'dependencies'
				}
			]
		}
		// {
		// 	name: 'Historical Record',
		// 	slug: 'history',
		// 	children: [
		// 		{
		// 			name: 'Welcome to Dimm City',
		// 			slug: 'introduction'
		// 		},
		// 		{
		// 			name: 'Prologue - Scene 1',
		// 			slug: 'prologue-scene-1'
		// 		},
		// 		{
		// 			name: 'Prologue - Scene 2',
		// 			slug: 'prologue-scene-2'
		// 		}
		// 	]
		// }
	];

	return _systemMap;
};
export const load = (async () => {
	return await getSystemMap();
});
