/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ethers } from 'ethers';
import { derived, get, writable } from 'svelte/store';
import { config } from '../config';
import { jwt, loadWallets } from './UserStore';

/** @returns {Window & { ethereum?: any }} */
function getWindow() {
	return window ?? { ethereum: null };
}

/**
 * @type {ethers.BrowserProvider}
 */
let provider;

/** @type {ethers.Signer} */
let signer;

/** @type {import('svelte/store').Writable<ethers.BrowserProvider>} */
const _provider = writable();

/** @type {import('svelte/store').Readable<boolean>} */
export const connected = derived([_provider], () => provider != null);
export const signerAddress = derived([_provider], async () => {
	let signer = await provider?.getSigner();
	return signer?.address;
});

export async function connect() {
	if (typeof getWindow().ethereum !== 'undefined') {
		provider = new ethers.BrowserProvider(getWindow().ethereum);

		_provider.set(provider);

		await getWindow().ethereum.enable();
		const accounts = await provider.listAccounts();
		const address = accounts[0];
		signer = await provider.getSigner();

		return address;
	}
}

/**
 * @param {string | Uint8Array} message
 */
async function signMessage(message) {
	try {
		// Get the user's selected Ethereum address
		//const accounts = await provider.listAccounts();
		//const address = accounts[0];

		// // Create a signer object using the selected address
		// signer = provider.getSigner(address);

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
	const network = await provider.getNetwork();
	const response = await fetch(
		`${config.apiBaseUrl}/chain-wallets/wallets/attach/${network.chainId}`,
		{
			method: 'POST',
			// @ts-ignore
			headers: {
				Authorization: `Bearer ${get(jwt)}`,
				sig: signature
			}
		}
	);

	if (response.ok) {
		console.log('attached wallet');
		await loadWallets(true);
	}
}
