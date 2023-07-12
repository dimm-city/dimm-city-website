import { defaultEvmStores, contracts, chainId, signerAddress } from 'svelte-ethers-store';
import { get } from 'svelte/store';
import { getCharacterReleases } from '$lib/Shared/Stores/getCharacterReleases';
import { config } from '../config';
import { jwt } from './UserStore';

let msg = '';
let initialized = false;
async function initReleaseContracts() {
	if (!initialized) {
		//ToDo: update to use release.contract
		const releaseResults = await getCharacterReleases();

		await defaultEvmStores.setProvider();

		releaseResults.data.forEach(async (/** @type {DC.CharacterRelease} */ release) => {
			await defaultEvmStores.attachContract(
				release.attributes.slug,
				release.attributes.contract.data.attributes.address,
				JSON.stringify(release.attributes.contract.data.attributes.abi)
			);
		});

		console.log('release contracts initialized', releaseResults);
		initialized = true;
	}
	// const contract = $contracts.selectedContract;
	// totalSupply = await contract.totalSupply();
}

/**
 * @param {string} releaseKey
 */
export async function getReleaseContract(releaseKey) {
	if (!initialized) await initReleaseContracts();
	const contract = get(contracts)[releaseKey];
	if (contract == null) throw new Error('No contract found for that release');
	return contract;
}

// const _signerAddress = writable<string>(getSessionValue('_signerAddress') ?? null);
// //_signerAddress.subscribe((value) => setSessionValue('_signerAddress', value));

// const _token = writable<string>(getSessionValue('_token') ?? null);

// export const sessionToken = derived<Readable<string>, string>(_token, ($token, set) => set($token));

// defaultEvmStores.signer.subscribe(async (signer) => {
// 	//when the signer changes, update the session variables
// 	if (signer != null && (get(_signerAddress) <= '' || get(_token) <= '')) {
// 		const sign = await signMessage('Sign this message to connect to your Dimm City profile.');
// 		_token.set(sign);
// 		_signerAddress.set(get(signerAddress));
// 	}
// });

export function disconnect() {
	//connected.set(false);
}
export async function connect() {
	defaultEvmStores.setProvider();
	// const providerOptions = {
	// 	/* See Provider Options Section */
	// };

	// const web3Modal = new Web3Modal({
	// 	network: 'mainnet', // optional
	// 	cacheProvider: true, // optional
	// 	providerOptions // required
	// });

	// const instance = await web3Modal.connect();
	// defaultEvmStores.setProvider(new Web3Provider(instance));
}

export async function loginWithWallet() {
	if (!msg) {
		const response = await fetch(`${config.apiBaseUrl}/chain-wallets/auth/verification-message`);
		if (response.ok) {
			msg = await response.text(); //"sign into dimm city"
		} else {
			return {
				error: 'Could not load verification message'
			};
		}
	}
	const signedMessage = await signMessage(msg);
	const response = await fetch(`${config.apiBaseUrl}/chain-wallets/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			network: get(chainId),
			address: get(signerAddress),
			signature: signedMessage
		})
	});

	if (response.ok) {
		const data = await response.json();
		jwt.set(data.jwt);
		//document.location = "/console";
	} else {
		return {
			error: 'Failed to login'
		};
	}
}

/**
 * @param {string | import("ethers").Bytes} message
 */
export async function signMessage(message) {
	const _signer = get(defaultEvmStores.signer);
	if (!_signer) await connect();
	return await _signer.signMessage(message);
}
