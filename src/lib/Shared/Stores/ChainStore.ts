import Web3Modal from 'web3modal';
import { signerAddress, connected, defaultEvmStores } from 'svelte-ethers-store';
import { derived, get, writable, type Readable } from 'svelte/store';
import { Web3Provider } from '@ethersproject/providers';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';

const profile = writable<string>(getSessionValue('profile') ?? null);
profile.subscribe((value) => setSessionValue('profile', value));

const token = writable<string>(getSessionValue('token') ?? null);
token.subscribe((value) => setSessionValue('token', value));

export const sessionToken = derived<Readable<string>, string>(token, ($token, set) => set($token));

export const loggedIn = derived(
	[connected, signerAddress, token],
	([$connected, $signerAddress, $sessionToken], set) => set($sessionToken > '' || ($connected && $signerAddress > '')),
	false
);

defaultEvmStores.signer.subscribe(async (signer) => {
	//when the signer changes, update the session variables
	if (signer != null && (get(profile) <= '' || get(token) <= '')) {
		const sign = await signMessage('Sign this message to connect to your Dimm City profile.');
		token.set(sign);
		profile.set(get(signerAddress));
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
