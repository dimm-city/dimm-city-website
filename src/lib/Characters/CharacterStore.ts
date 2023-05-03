import { writable, derived, get } from 'svelte/store';
import { getExpiryTime, getLocalValue, setLocalValue } from '$lib/Shared/Stores/StoreUtils';
import { Character, type ICharacter } from '$lib/Characters/Models/Character';
import { searchText } from '$lib/Shared/Stores/ShellStore';
import { getReleaseContract } from '$lib/Shared/Stores/ContractsStore';
import type { ICharacterRelease } from './Models/ICharacterRelease';
import { config } from '$lib/Shared/config';
import { jwt, refreshToken } from '$lib/Shared/Stores/UserStore';

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

export async function updateCharacter(character: ICharacter) {
	console.log('updateCharacter');

	const importData = JSON.parse(JSON.stringify(character));
	importData.playerUpdated = true;
	//importData.slug = character.name.replace(' ', '-');

	importData.currentLocation =  character.currentLocation?.data?.id;
	importData.originLocation = character.originLocation?.data?.id;

	importData.specialties = [
		...character.specialties?.data?.map((r) => ({ id: Number.parseInt(r.id) }))
	];

	fetch(`${config.apiBaseUrl}/characters/${character.id}?populate=*`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${get(jwt)}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ data: { id: character.id, ...importData } })
	})
		.then(async (res) => {
			const { data, errors } = await res.json();
			if (res.ok) {
				console.assert(data != null);
				console.log('saved', data);
				characters.update((c) => {
					return [
						...c.filter((l) => l.id != character.id),
						Object.assign(character, data.attributes)
					];
				});
				await refreshToken(data.attributes.tokenId);
			} else {
				//TODO: display error
				console.error('failed', errors, data);
			}
		})
		.catch((reason) => {
			console.log('could not update character', reason);
		});
}

// export async function createCitizenFile(character: ICharacter) : Promise<ICharacter> {
// 	return new Character();
// }
export async function createSporo(release: ICharacterRelease): Promise<ICharacter> {
	const contract = await getReleaseContract(release.slug);
	const cost = await contract.getPackCost();
	const totalSupply = await contract.totalSupply(); // as BigNumber;
	const maxSupply = await contract.MaxSupply(); // as BigNumber;

	if (totalSupply.gte(maxSupply)) throw new Error('This release is currently sold out.');

	//await contract.buyPack(get(signerAddress), 1, true, {value: cost});

	await new Promise((resolve) =>
		setTimeout(async () => {
			console.log(contract, cost, totalSupply, maxSupply.toNumber());

			resolve(0);
		}, 500)
	);

	//ToDo: Get balanceOf, get new tokenIds

	const tokenId = 35;
	console.log('downloading new token');

	return new Character(); //await downloadSporo(tokenId, release);
}
