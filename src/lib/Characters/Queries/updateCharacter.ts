import type { ICharacter } from '$lib/Characters/Models/Character';
import { config } from '$lib/Shared/config';
import { get } from 'svelte/store';
import { jwt } from '$lib/Shared/Stores/UserStore';

export async function updateCharacter(character: ICharacter) {
	
	const importData = JSON.parse(JSON.stringify(character));
	importData.playerUpdated = true;
	//importData.slug = character.name.replace(' ', '-');
	// importData.currentLocation = character.currentLocation.id;
	// importData.specialties = character.specialties.map(r => r.id);

	window
		.fetch(`${config.apiBaseUrl}/characters/${character.id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${get(jwt)}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: importData })
		})
		.then(async (res) => {
			const { data, errors } = await res.json();
			if (res.ok) {

				console.log('saved', data);
				console.assert(data != null);
				console.log('finding token');

				// const token = get(myCharacterTokens).find((t) => t.release + '-' + t.edition == character.tokenId.toUpperCase());

				// if (token != null) {
				// 	console.log('updating local token');

				// 	token.name = character.name;
				// 	token.description = character.vibe;
				// 	token.hasCharacter = true;
				// 	myCharacterTokens.update(
				// 		($myCharacterTokens) =>
				// 			($myCharacterTokens = [
				// 				token,
				// 				...$myCharacterTokens.filter((s) => s.release + '-' + s.edition != character.tokenId.toUpperCase())
				// 			])
				// 	);
				// } else {
				// 	console.warn('could not find token');
				// }
				// characters.set([character, ...get(characters).filter((l) => l.id != character.id)]);
			} else {
				//TODO: display error
				console.log('failed', errors, data);
			}
		})
		.catch((reason) => {
			console.log('could not update character', reason);
		});
}
