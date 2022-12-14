import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';
import { jwt, profile } from '$lib/Shared/Stores/UserStore';
import { Token, type IToken } from '$lib/Characters/Models/Character';
import { contracts, defaultEvmStores } from 'svelte-ethers-store';
import { get, writable } from 'svelte/store';
import type { ICharacterRelease } from '$lib/Characters/Models/ICharacterRelease';
import { getCharacterReleases } from '$lib/Characters/Queries/getCharacterReleases';
import { config } from '$lib/Shared/config';

export const archive = writable<IToken[]>(getSessionValue('archive') ?? []);
archive.subscribe((value) => setSessionValue('archive', value));

let initialized = false;
async function initReleaseContracts() {
	if (!initialized) {
		const data = await getCharacterReleases();

		await defaultEvmStores.setProvider();

		data.forEach(async (release) => {
			await defaultEvmStores.attachContract(release.slug, release.contractAddress, JSON.stringify(release.abi));
		});

		console.log('release contracts initialized', data);
		initialized = true;
	}
}

export async function getSporos(): Promise<IToken[]> {
	if (!get(contracts)) return;
	await initReleaseContracts();

	const releases = await getCharacterReleases();
	const address = get(profile).settings.wallet.address;
	const output = new Array<IToken>();
	for (let index = 0; index < releases.length; index++) {
		const release = releases[index];

		const contract = get(contracts)[release.slug];

		console.log('getting balance for ', address, contract.provider);

		const balance = await contract.balanceOf(address);
		const number = balance.toNumber();
		for (let index = 0; index < number; index++) {
			const sporo = await contract.tokenOfOwnerByIndex(address, index);
			const tokenId = sporo.toNumber();
			const data = await downloadSporo(tokenId, release);
			output.push(data);
		}
	}

	archive.set(output);
	return output;
}

async function downloadSporo(tokenId: number, release: ICharacterRelease): Promise<IToken> {
	let json: IToken = new Token();
	try {
		const response = await fetch(`${release.metadataBaseUri}/${tokenId}.json`);

		if (response.ok) {
			json = (await response.json()) as IToken;
		}
	} catch (error) {
		console.error(error);
	}
	json.id = tokenId;
	json.tokenId = `${release.slug}-${tokenId}`;

	return json;
}

export async function loadTokens(): Promise<IToken[]> {
	let json: IToken[];
	try {
		const response = await fetch(`${config.apiBaseUrl}/users/me/tokens`, {
			headers: {
				Authorization: `Bearer ${get(jwt)}`
			}
		});

		if (response.ok) {
			json = (await response.json()) as IToken[];
		}
	} catch (error) {
		console.error(error);
	}
	archive.set(json);
	return json;
}
