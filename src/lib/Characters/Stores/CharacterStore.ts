import { sessionToken } from '$lib/Shared/ChainStore';
import { config } from '$lib/Shared/config';
import { ethers } from 'ethers';
import { contracts, defaultEvmStores, signerAddress } from 'svelte-ethers-store';
import { get, writable } from 'svelte/store';
import { Character, type ICharacter } from '../Character';
import type { ICharacterRelease } from '../Components/ICharacterRelease';

export const abilities = writable([]);

export const buyCharacter = async (selectedRelease: ICharacterRelease) => {
	//await defaultEvmStores.setProvider();
	//.then(async (x) => {
	const contract = get(contracts).selectedContract;
	console.log('contract', contract);

	const cost = await contract.getPackCost();
	const totalSupply = await contract.totalSupply();
	const maxSupply = await contract.MaxSupply();

	//await contract.buyPack(get(signerAddress), 1, true, {value: cost});

	await new Promise((resolve) =>
		setTimeout(async () => {
			console.log(contract, cost, totalSupply, maxSupply.toNumber());

			resolve(0);
		}, 500)
	);

	//ToDo: Get balanceOf, get new tokenIds

	const tokenId = 35;
	const character = await importTokenData(selectedRelease.slug, tokenId);

	return character;
};

async function importTokenData(release: string, tokenId: any) {
	return await window
		.fetch(config.apiBaseUrl + '/sporos/import/' + release + '/' + tokenId, {
			method: 'POST',
			headers: {
				authorization: get(sessionToken),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: 'unknown citizen' })
		})
		.then(async (res) => {
			const { data, errors } = await res.json();
			if (res.ok) {
				console.log('saved');
				// token.name = character.name;
				// token.description = character.vibe;
				// token.hasCharacter = true;
				// $myCollection = [token, ...$myCollection.filter((s) => s.release + '-' + s.edition != tokenId)];
				// nextStep();
				return data;
			} else {
				//TODO: display error
				console.warn('Problem encountered while importing token data', errors);
				return { tokenId };
			}
			// isSaving = false;
		})
		.catch((reason) => {
			console.log('could not create character', reason);
			return { tokenId };
		});
}
