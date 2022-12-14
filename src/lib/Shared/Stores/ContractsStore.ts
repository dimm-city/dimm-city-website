import Web3Modal from 'web3modal';
import { signerAddress, connected, defaultEvmStores, contracts } from 'svelte-ethers-store';
import { derived, get, writable, type Readable } from 'svelte/store';
import { Web3Provider } from '@ethersproject/providers';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';

import { getCharacterReleases } from '$lib/Characters/Queries/getCharacterReleases';

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
	// const contract = $contracts.selectedContract;
	// totalSupply = await contract.totalSupply();
}

export async function getReleaseContract(releaseKey: string) {
	if (!initialized) await initReleaseContracts();
	const contract = get(contracts)[releaseKey];
	if (contract == null) throw new Error('No contract found for that release');
	return contract;
}

const _signerAddress = writable<string>(getSessionValue('_signerAddress') ?? null);
_signerAddress.subscribe((value) => setSessionValue('_signerAddress', value));

const _token = writable<string>(getSessionValue('_token') ?? null);
_token.subscribe((value) => setSessionValue('_token', value));

export const sessionToken = derived<Readable<string>, string>(_token, ($token, set) => set($token));

defaultEvmStores.signer.subscribe(async (signer) => {
	//when the signer changes, update the session variables
	if (signer != null && (get(_signerAddress) <= '' || get(_token) <= '')) {
		const sign = await signMessage('Sign this message to connect to your Dimm City profile.');
		_token.set(sign);
		_signerAddress.set(get(signerAddress));
	}
});

export function disconnect() {
	//connected.set(false);
}
export async function connect() {
	const providerOptions = {
		/* See Provider Options Section */
	};

	const web3Modal = new Web3Modal({
		network: 'mainnet', // optional
		cacheProvider: true, // optional
		providerOptions // required
	});

	const instance = await web3Modal.connect();
	defaultEvmStores.setProvider(new Web3Provider(instance));
}

export async function signMessage(message: string) {
	const _signer = get(defaultEvmStores.signer);
	return await _signer.signMessage(message);
}
