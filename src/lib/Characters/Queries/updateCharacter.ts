import { sessionToken } from '$lib/Shared/Stores/ChainStore';
import type { ICharacter } from '$lib/Characters/Models/Character';
import { config } from '$lib/Shared/config';
import { get } from 'svelte/store';
import { characters, myCharacters } from '../CharacterStore';

export async function canEdit(tokenId: string): Promise<boolean> {
	return await window
		.fetch(`${config.apiBaseUrl}/sporos/can-edit/${tokenId}`, {
			method: 'GET',
			headers: {
				authorization: get(sessionToken),
				'Content-Type': 'application/json'
			}
		})
		.then(async (res) => {
			if (res.ok) {
				const data = await res.json();
				return data;
			} else {
				//TODO: display error
				const { data, errors } = await res.json();
				console.log('failed', errors, data);
				return false;
			}
		})
		.catch((reason) => {
			console.log('could not create character', reason);
			return false;
		});
}

export async function updateCharacter(character: ICharacter) {
	const importData = JSON.parse(JSON.stringify(character));
	//importData.slug = character.name.replace(' ', '-');
	// importData.currentLocation = character.currentLocation.id;
	// importData.specialties = character.specialties.map(r => r.id);

	window
		.fetch(`${config.apiBaseUrl}/sporos/update/${character.tokenId}`, {
			method: 'POST',
			headers: {
				authorization: get(sessionToken),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(importData)
		})
		.then(async (res) => {
			const { data, errors } = await res.json();
			if (res.ok) {
				console.log('saved', data);
				console.assert(data != null);
				console.log('finding token');

				const token = get(myCharacters).find((t) => t.release + '-' + t.edition == character.tokenId.toUpperCase());

				if (token != null) {
					console.log('updating local token');

					token.name = character.name;
					token.description = character.vibe;
					token.hasCharacter = true;
					myCharacters.update(
						($myCharacters) =>
							($myCharacters = [
								token,
								...$myCharacters.filter((s) => s.release + '-' + s.edition != character.tokenId.toUpperCase())
							])
					);
				} else {
					console.warn('could not find token');
				}
				characters.set([character, ...get(characters).filter((l) => l.id != character.id)]);
			} else {
				//TODO: display error
				console.log('failed', errors, data);
			}
		})
		.catch((reason) => {
			console.log('could not create character', reason);
		});
}
