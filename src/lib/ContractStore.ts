import { ContractContext } from '../contracts/DimmCityV1Base';
import { config } from './config';
import abiJson from '../contracts/DimmCityV1Base.json';
import { signer, connect, connected, getSignerAddress, network } from './ChainStore';
import { BigNumber, ethers } from 'ethers';
import { get } from 'svelte/store';


// signer.subscribe((s) => {
// 	if (get(connected)) {
// 		contractConfig = config.releases.s1r1.networks.find((n) => n.chainId === get(network).chainId);
// 		contract = new ethers.Contract(contractConfig.address, abiJson.abi, s) as unknown as ContractContext;
// 	}
// });

// network.subscribe((net) => {
// 	if (net != null && get(connected)) {
// 		contractConfig = config.releases.s1r1.networks.find((n) => n.chainId === net.chainId);
// 	}
// });
let packCost: BigNumber;
let contractConfig; // = config.releases.s1r1.networks.find((n) => n.chainId === get(network).chainId);
let contract; // = new ethers.Contract(contractConfig.address, abiJson.abi, get(signer)) as unknown as ContractContext;

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
