// import { Web3Provider, type Network } from '@ethersproject/providers';
// import { BigNumber, Contract, type Signer } from 'ethers';

import Web3Modal from 'web3modal';
import { config } from '$lib/Shared/config';
import { signer, signerAddress, connected, defaultEvmStores, chainId } from 'svelte-ethers-store';
import { BigNumber, Contract } from 'ethers';
import type { ContractContext } from 'src/contracts/DimmCityV1Base';
import abiJson from '../../contracts/DimmCityV1Base.json';
import { derived, get, writable, type Readable } from 'svelte/store';
import { Web3Provider } from '@ethersproject/providers';
import { getSessionValue, setSessionValue } from './StoreUtils';

let packCost: BigNumber;
let _contract: ContractContext;
export const contractConfig = writable({} as any);

export const contract: Readable<ContractContext> = derived(
	[connected, signer, contractConfig],
	([$connected, $signer, $contractConfig], set) => {
		if ($connected) {
			_contract = new Contract($contractConfig.address, abiJson.abi, $signer) as unknown as ContractContext;
			set(_contract);
		} else set(null);
	}
);

chainId.subscribe((c) => {
	const record = config.releases.dcs1r1.networks.find((n) => n.chainId === c);
	console.log('contract', c, record);

	contractConfig.set(record);
});

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

	// _provider = new Web3Provider(instance);
	// provider.set(_provider);

	// window.ethereum.on('chainChanged', (_chainId) => {
	// 	console.log(_chainId);
	// 	window.location.reload();
	// });
	//await updateDetails();
}

// export async function updateDetails() {
// 	_signer = _provider.getSigner();
// 	_selectedAddress = await _signer.getAddress();
// 	_network = await _provider.getNetwork();

// 	signer.set(_signer);
// 	address.set(_selectedAddress);
// 	network.set(_network);

// 	contractConfig = config.releases.s1r1.networks.find((n) => n.chainId === _network.chainId);

// 	contract = new Contract(contractConfig.address, abiJson.abi, _signer) as unknown as ContractContext;
// }

export async function signMessage(message: string) {
	const _signer = get(defaultEvmStores.signer);

	return await _signer.signMessage(message);
}

export async function getDetails() {
	if (!get(connected)) await connect();
	const phase = await _contract.ReleasePhase();
	const cost = await _contract.getPackCost();
	console.log(phase, cost.toString());
}

export const getNumberSporos = async () => (await _contract.balanceOf(get(signerAddress))).toNumber();

export async function buyPack(numberToMint: number) {
	if (!get(connected)) await connect();
	const _signer = get(signer);
	const value = packCost.mul(BigNumber.from(numberToMint));
	await _contract.buyPack(await _signer.getAddress(), BigNumber.from(numberToMint), true, { value: value });

	const balance = await _signer.getBalance();

	console.log(balance.toString());
}

export async function getSporos(): Promise<any> {
	if (!get(connected) || !get(contract)) return;

	const address = get(signerAddress);
	const number = (await get(contract).balanceOf(address)).toNumber();

	const tasks = new Array<Promise<any>>();
	for (let index = 0; index < number; index++) {
		const sporo = await get(contract).tokenOfOwnerByIndex(address, index);
		const tokenId = sporo.toNumber();
		const data = await downloadSporo(tokenId);
		//if (data && data.id > -1)
		tasks.push(data);
	}

	return Promise.all(tasks).then((sporos) => sporos);
}

export async function downloadSporo(tokenId: number): Promise<any> {
	let json = {};
	try {
		const response = await fetch(`${get(contractConfig).metadataBaseUri}/${tokenId}.json`);

		if (response.ok) {
			json = await response.json();
		}
	} catch (error) {
		console.error(error);
	}
	return json;
}
