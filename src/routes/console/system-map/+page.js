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
			slug: 'console',
			children: []
		},
		// {
		// 	name: 'Op Console',
		// 	slug: 'console',
		// 	children: []
		// },
		{
			name: 'Citizen Files',
			slug: 'console/citizens',
			children: []
		},
		{
			name: 'Locations',
			slug: 'console/locations',
			children: [] // await getDistricts()
		},
		{
			name: 'Specialties',
			slug: 'console/specialties',
			children: [] // await getSpecialties()
		},
		{
			name: 'Races',
			slug: 'console/races',
			children: []
		},
		// {
		// 	name: 'Journal Entries',
		// 	slug: 'console/journal-entries',
		// 	children: [] //await getJournalEntries()
		// },
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
			children: []
		},
		{
			name: 'Change Log',
			slug: 'console/about/change-log'
		},
		{
			name: 'Dependencies and Integrations',
			slug: 'console/about/dependencies'
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
