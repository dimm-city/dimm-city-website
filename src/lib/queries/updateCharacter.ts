import { sessionToken } from '$lib/ChainStore';
import type { Character } from '$lib/Characters/Character';
import { get } from 'svelte/store';

export async function updateCharacter(character: Character) {
	const importData = JSON.parse(JSON.stringify(character));
	//importData.slug = character.name.replace(' ', '-');
	// importData.currentLocation = character.currentLocation.id;
	// importData.specialties = character.specialties.map(r => r.id);

	window
		.fetch('http://localhost:1337/api/sporos/update/' + character.tokenId, {
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
			} else {
				//TODO: display error
                console.log('failed', errors, data);
                
			}
		})
		.catch((reason) => {
			console.log('could not create character', reason);
		});
}
