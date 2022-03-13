import { Web3Provider, type Network } from '@ethersproject/providers';
import { BigNumber, Contract, type Signer } from 'ethers';

import Web3Modal from 'web3modal';
import { derived, get, writable, type Writable } from 'svelte/store';
import type { ContractContext } from 'src/contracts/DimmCityV1Base';
import { config } from './config';
import abiJson from '../contracts/DimmCityV1Base.json';

declare let window: any;

let _provider: Web3Provider;
let _signer: Signer;
let _network: Network;
let _selectedAddress: string;

export const signer: Writable<Signer> = writable(_signer, null);
export const address = writable();
export const provider = writable();
export const connected = writable(false);
export const network: Writable<Network> = writable();

let packCost: BigNumber;
let contractConfig; // = config.releases.s1r1.networks.find((n) => n.chainId === get(network).chainId);
let contract; // = new ethers.Contract(contractConfig.address, abiJson.abi, get(signer)) as unknown as ContractContext;

export const getSignerAddress = () => _selectedAddress;

export function disconnect() {
	connected.set(false);
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
	_provider = new Web3Provider(instance);
	provider.set(_provider);

	window.ethereum.on('chainChanged', (_chainId) => {
		console.log(_chainId);
		window.location.reload();
	});
	await updateDetails();

	connected.set(true);

	//console.log('provider', _provider, _network); // contractConfig = config.releases.s1r1.networks.find(
	//   (n) => n.chainId === network.chainId
	// );

	// //if (__provider.on) {
	// // TODO handle disconnect/connect events
	// __provider.on('accountsChanged', (accounts) => {
	// 	console.log('accountChanged', accounts);

	// 	address.set(accounts[0]);
	// });
	// // __provider.on('chainChanged', chainChangedHandler)
	// // __provider.on('disconnect', disconnectHandler)
	// //}
}

export async function updateDetails() {
	_signer = _provider.getSigner();
	_selectedAddress = await _signer.getAddress();
	_network = await _provider.getNetwork();

	signer.set(_signer);
	address.set(_selectedAddress);
	network.set(_network);

	contractConfig = config.releases.s1r1.networks.find((n) => n.chainId === _network.chainId);

	contract = new Contract(contractConfig.address, abiJson.abi, _signer) as unknown as ContractContext;
}

export async function getDetails() {
	if (!get(connected)) await connect();
	const phase = await contract.ReleasePhase();
	const cost = await contract.getPackCost();
	console.log(phase, cost.toString());
}

export const getNumberSporos = async () => (await contract.balanceOf(getSignerAddress())).toNumber();

export async function buyPack(numberToMint: number) {
	if (!get(connected)) await connect();
	const _signer = get(signer);
	const value = packCost.mul(BigNumber.from(numberToMint));
	await contract.buyPack(await _signer.getAddress(), BigNumber.from(numberToMint), true, { value: value });

	const balance = await _signer.getBalance();

	console.log(balance.toString());
}

export async function getSporos(): Promise<Array<object>> {
	const number = (await contract.balanceOf(getSignerAddress())).toNumber();

	const tasks = new Array<Promise<any>>();
	for (let index = 0; index < number; index++) {
		const sporo = await contract.tokenOfOwnerByIndex(getSignerAddress(), index);
		const tokenId = sporo.toNumber();
		tasks.push(downloadSporo(tokenId));
	}

	return Promise.all(tasks);
}

async function downloadSporo(tokenId: number): Promise<object> {
	let json = {};
	try {
		const response = await fetch(`${contractConfig.metadataBaseUri}/${tokenId}`);

		if (response.ok) {
			json = await response.json();
		}
	} catch (error) {
		console.error(error);
	}
	return json;
}
