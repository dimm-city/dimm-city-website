import { Web3Provider, type Network } from '@ethersproject/providers';
import { type Signer } from 'ethers';
// import { ContractContext } from "../contracts/DimmCityV1Base";
// import { config } from "../configuration/config";
import abiJson from '../contracts/DimmCityV1Base.json';
import Web3Modal from 'web3modal';
import { derived, get, writable, type Writable } from 'svelte/store';

declare let window: any;
// interface Window {
// 	ethereum?: import('ethers').providers.Web3Provider;
//   }
let _provider: Web3Provider;
let _signer: Signer;
let _network: Network;
let _selectedAddress: string;

export const signer: Writable<Signer> = writable(_signer, null);
export const address = writable();
export const provider = writable();
export const connected = writable(false);
export const network: Writable<Network> = writable();

//let contract: ContractContext;
//let packCost: BigNumber;
//let connected = false;

let contractConfig;

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

	// contract = new ethers.Contract(
	//   contractConfig.address,
	//   abiJson.abi,
	//   signer
	// ) as unknown as ContractContext;

	// packCost = await contract.getPackCost();

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
}

// export async function getDetails() {
//   if (!connected) await connect();
//   const phase = await contract.ReleasePhase();
//   const cost = await contract.getPackCost();
//   console.log(phase, cost.toString());
// }

// export const getNumberSporos = async () =>
//   (await contract.balanceOf(signerAddress)).toNumber();

// export async function buyPack(numberToMint: Number) {
//   if (!connected) await connect();
//   let value = packCost.mul(BigNumber.from(numberToMint));
//   await contract.buyPack(
//     await signer.getAddress(),
//     BigNumber.from(numberToMint),
//     true,
//     { value: value }
//   );

//   let balance = await signer.getBalance();

//   console.log(balance.toString());
// }

// export async function getSporos(): Promise<Array<object>> {
//   const number = (await contract.balanceOf(signerAddress)).toNumber();

//   const tasks = new Array<Promise<any>>();
//   for (let index = 0; index < number; index++) {
//     const sporo = await contract.tokenOfOwnerByIndex(signerAddress, index);
//     const tokenId = sporo.toNumber();
//     tasks.push(downloadSporo(tokenId));
//   }

//   return Promise.all(tasks);
// }

// async function downloadSporo(tokenId: Number): Promise<object> {
//   let json = {};
//   try {
//     const response = await fetch(`${contractConfig.metadataBaseUri}/${tokenId}`);

//     if (response.ok) {
//       json = await response.json();
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   return json;
// }
