import { writable, derived } from 'svelte/store';
import {
	getExpiryTime,
	getLocalValue,
	getSessionValue,
	setLocalValue,
	setSessionValue
} from '$lib/Shared/Stores/StoreUtils';
import type { ICharacter, IToken } from '$lib/Characters/Models/Character';
import { searchText } from '$lib/Shared/Stores/ShellStore';

export const characters = writable<ICharacter[]>(getLocalValue('characters') ?? []);
characters.subscribe((value) => setLocalValue('characters', value, getExpiryTime()));

export const filteredCharacters = derived(
	[characters, searchText],
	([$characters, $searchText]) => {
		return $searchText == ''
			? $characters
			: $characters
					.filter((c) => c.name.toLowerCase().indexOf($searchText.toLowerCase()) > -1)
					.sort((a, b) => {
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						else return -1;
					});
	}
);

export const myCharacterTokens = writable<IToken[]>(getSessionValue('collection') ?? []);
myCharacterTokens.subscribe((value) =>
	setSessionValue('collection', Array.isArray(value) ? value : [])
);
