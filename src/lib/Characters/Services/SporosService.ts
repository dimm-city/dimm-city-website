import { Token, type ICharacter, type IToken } from '$lib/Characters/Models/Character';
import { getCharacterReleases } from '$lib/Characters/Queries/getCharacterReleases';
import type { BigNumber } from 'ethers';
import { connected, contracts, defaultEvmStores, signerAddress } from 'svelte-ethers-store';
import { get } from 'svelte/store';
import { sessionToken } from '$lib/Shared/Stores/UserStore';
import { config } from '$lib/Shared/config';
import type { ICharacterRelease } from '$lib/Characters/Models/ICharacterRelease';
import { myCharacterTokens } from '../CharacterStore';
let initialized = false;
async function initReleaseContracts() {
	if (!initialized) {
		const data = await getCharacterReleases();

		await defaultEvmStores.setProvider();

		data.forEach(async (release) => {
			await defaultEvmStores.attachContract(release.slug, release.contractAddress, JSON.stringify(release.abi));
		});
		initialized = true;
	}
	// const contract = $contracts.selectedContract;
	// totalSupply = await contract.totalSupply();
}

async function getReleaseContract(releaseKey: string) {
	if (!initialized) await initReleaseContracts();
	const contract = get(contracts)[releaseKey];
	console.log('contract', contract);
	return contract;
}

async function downloadSporo(tokenId: number, release: ICharacterRelease): Promise<IToken> {
	let json: IToken = new Token();
	try {
		const response = await fetch(`${release.metadataBaseUri}/${tokenId}.json`);

		if (response.ok) {
			json = await response.json() as IToken;
		}
	} catch (error) {
		console.error(error);
	}
	json.id = tokenId;
	json.tokenId = `${release.slug}-${tokenId}`;

	return json;
}

export async function createSporo(release: ICharacterRelease): Promise<IToken> {
	const contract = await getReleaseContract(release.slug);
	const cost = await contract.getPackCost();
	const totalSupply = await contract.totalSupply() as BigNumber;
	const maxSupply = await contract.MaxSupply() as BigNumber;

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
	
	return await downloadSporo(tokenId, release);
}

export async function getSporos(): Promise<IToken[]> {
	if (!get(connected) || !get(contracts)) return;

	const releases = await getCharacterReleases();

	const tasks = new Array<Promise<IToken>>();
	const address = get(signerAddress);

	releases.forEach(async (release) => {
		const contract = get(contracts)[release.slug];

		const number = (await contract.balanceOf(address)).toNumber();
		for (let index = 0; index < number; index++) {
			const sporo = await contract.tokenOfOwnerByIndex(address, index);
			const tokenId = sporo.toNumber();
			const data = downloadSporo(tokenId, release);
			//if (data && data.id > -1)
			tasks.push(data);
		}
	});

	return Promise.all(tasks).then((sporos) => sporos);
}

export async function createCitizenFile(character: ICharacter) {
	return await window
		//.fetch(config.apiBaseUrl + '/sporos/import/' + release + '/' + tokenId, {
		.fetch(`${config.apiBaseUrl}/sporos/import/${character.token.release}/${character.token.edition}`, {
			method: 'POST',
			headers: {
				authorization: get(sessionToken),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(character)
		})
		.then(async (res) => {
			const { data, errors } = await res.json();
			if (res.ok) {
				console.log('saved');
				// token.name = character.name;
				// token.description = character.vibe;
				// token.hasCharacter = true;
				myCharacterTokens.set([]);
				// nextStep();
				return data;
			} else {
				//TODO: display error
				console.warn('Problem encountered while importing token data', errors);
				return null;
			}
			// isSaving = false;
		})
		.catch((reason) => {
			console.log('could not create character', reason);
			return null;
		});
}
