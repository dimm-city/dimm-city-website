// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDistricts } from '$lib/Shared/Stores/getDistricts';
import { getSpecialties } from '$lib/Shared/Stores/getSpecialties';

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
			slug: '/dashboard',
			children: []
		},
		// {
		// 	name: 'Op Console',
		// 	slug: 'console',
		// 	children: []
		// },
		{
			name: 'Citizen Files',
			slug: 'citizens',
			children: []
		},
		{
			name: 'Locations',
			slug: 'locations',
			children: [] // await getDistricts()
		},
		{
			name: 'Specialties',
			slug: 'specialties',
			children: [] // await getSpecialties()
		},
		{
			name: 'Races',
			slug: 'races',
			children: []
		},
		{
			name: 'Journal Entries',
			slug: 'journal-entries',
			children: [] //await getJournalEntries()
		},
		// {
		// 	name: 'Spores',
		// 	slug: 'spores'
		// },
		// {
		// 	name: 'Tools',
		// 	slug: 'tools',
		// 	children: [
		// 		{
		// 			name: 'Cyberwar',
		// 			slug: 'cyberwar'
		// 		},
		// 		{
		// 			name: 'Dice',
		// 			slug: 'dice'
		// 		}
		// 	]
		// },
		{
			name: 'About',
			slug: 'console/about',
			children: [
				{
					name: 'Change Log',
					slug: 'change-log'
				},
				{
					name: 'Dependencies and Integrations',
					slug: 'dependencies'
				}
			]
		}
		// {
		// 	name: 'Historical Record',
		// 	slug: 'stories',
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
