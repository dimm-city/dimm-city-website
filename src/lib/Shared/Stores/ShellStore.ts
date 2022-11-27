import { writable, derived } from 'svelte/store';
import type { ISummaryItem } from '$lib/Shared/Models/ISummaryItem';
import { getLocalValue, getSessionValue, setLocalValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';
import type { ICharacter } from '$lib/Characters/Models/Character';

export const searchText = writable('');

export const myCollection = writable(getSessionValue('collection') ?? []);
myCollection.subscribe((value) => setSessionValue('collection', value));

export const specialties = writable(getLocalValue('specialties') ?? []);
specialties.subscribe((value) => setLocalValue('specialties', value, getExpiryTime()));

export const characters = writable<ICharacter[]>(getLocalValue('characters') ?? []);
characters.subscribe((value) => setLocalValue('characters', value, getExpiryTime()));

export const filteredCharacters = derived([characters, searchText], ([$characters, $searchText]) => {
	return $searchText == ''
		? $characters
		: $characters
				.filter((c) => c.name.toLowerCase().indexOf($searchText.toLowerCase()) > -1)
				.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					else return -1;
				});
});

export const districts = writable<ISummaryItem[]>(getLocalValue('districts') ?? []);
districts.subscribe((value) => setLocalValue('districts', value, getExpiryTime()));
function getExpiryTime(): number {
	return new Date(new Date().getTime() + 60 * 1000).getTime();
}

export const pageImage = writable('https://files.dimm.city/stories/intro/index.png');

export const filterAndSort = (items, text) => {
	return sortByName(items.filter((c) => c.name.toLowerCase().indexOf(text.toLowerCase()) > -1));
};

export const sortByName = (items) => {
	return items.sort((a, b) => {
		if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		else return -1;
	});
};
