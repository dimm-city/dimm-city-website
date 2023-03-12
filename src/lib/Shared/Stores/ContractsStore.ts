import { defaultEvmStores, contracts, chainId, signerAddress } from 'svelte-ethers-store';
import { get } from 'svelte/store';
import { getCharacterReleases } from '$lib/Characters/Queries/getCharacterReleases';
import { config } from '../config';
import { jwt } from './UserStore';

let msg = '';
let initialized = false;
async function initReleaseContracts() {
	if (!initialized) {
		//ToDo: update to use release.contract
		const data = await getCharacterReleases();

		await defaultEvmStores.setProvider();

		data.forEach(async (release) => {
			await defaultEvmStores.attachContract(
				release.slug,
				release.contractAddress,
				JSON.stringify(release.abi)
			);
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
		}else{
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

export async function signMessage(message: string) {
	const _signer = get(defaultEvmStores.signer);
	if (!_signer) await connect();
	return await _signer.signMessage(message);
}
