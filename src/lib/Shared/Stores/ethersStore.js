import { ethers } from 'ethers';
import { derived, get, writable } from 'svelte/store';
import { config } from '../config';
import { jwt, loadWallets } from './UserStore';

/** @type {Window & { ethereum?: any }} */
const windowWithEthereum = window;

/**
 * @type {ethers.providers.Web3Provider}
 */
let provider;

/** @type {ethers.providers.JsonRpcSigner} */
let signer;

/** @type {import('svelte/store').Writable<ethers.providers.Web3Provider>} */
const _provider = writable();

/** @type {import('svelte/store').Readable<boolean>} */
export const connected = derived([_provider], () => provider != null);
export const signerAddress = derived([_provider], () => provider?.getSigner()?.getAddress());

export async function connect() {
	if (typeof windowWithEthereum.ethereum !== 'undefined') {
		provider = new ethers.providers.Web3Provider(windowWithEthereum.ethereum);
		_provider.set(provider);

		await windowWithEthereum.ethereum.enable();
		const accounts = await provider.listAccounts();
		const address = accounts[0];
		signer = provider.getSigner(address);

		return address;
	}
}

/**
 * @param {string | ethers.utils.Bytes} message
 */
async function signMessage(message) {
	try {
		// Get the user's selected Ethereum address
		const accounts = await provider.listAccounts();
		const address = accounts[0];

		// Create a signer object using the selected address
		signer = provider.getSigner(address);

		// Sign the message
		const signature = await signer.signMessage(message);

		return signature;
	} catch (error) {
		console.error('Failed to sign the message:', error);
	}
}

export async function loginWithWallet() {
	let msg = '';
	const msgResponse = await fetch(`${config.apiBaseUrl}/chain-wallets/auth/verification-message`);
	if (msgResponse.ok) {
		msg = await msgResponse.text(); //"sign into dimm city"
	} else {
		return {
			error: 'Could not load verification message'
		};
	}

	const signedMessage = await signMessage(msg);

	const network = await provider.getNetwork();
	const chainId = network.chainId;

	const response = await fetch(`${config.apiBaseUrl}/chain-wallets/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			network: chainId,
			address: signerAddress,
			signature: signedMessage
		})
	});

	if (response.ok) {
		const data = await response.json();
		jwt.set(data.jwt);
	} else {
		return {
			error: 'Failed to login'
		};
	}
}

export async function attachWallet() {
	const signature = await signMessage('Attach this wallet');

	const response = await fetch(`${config.apiBaseUrl}/chain-wallets/wallets/attach/${$chainId}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${get(jwt)}`,
			sig: signature
		}
	});

	if (response.ok) {
		console.log('attached wallet');
		await loadWallets(true);
	}
}
