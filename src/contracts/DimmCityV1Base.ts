import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
	DimmCityV1Base,
	DimmCityV1BaseMethodNames,
	DimmCityV1BaseEventsContext,
	DimmCityV1BaseEvents
>;

export declare type EventFilter = {
	address?: string;
	topics?: Array<string>;
	fromBlock?: string | number;
	toBlock?: string | number;
};

export interface ContractTransactionOverrides {
	/**
	 * The maximum units of gas for the transaction to use
	 */
	gasLimit?: number;
	/**
	 * The price (in wei) per unit of gas
	 */
	gasPrice?: BigNumber | string | number | Promise<any>;
	/**
	 * The nonce to use in the transaction
	 */
	nonce?: number;
	/**
	 * The amount to send with the transaction (i.e. msg.value)
	 */
	value?: BigNumber | string | number | Promise<any>;
	/**
	 * The chain ID (or network ID) to use
	 */
	chainId?: number;
}

export interface ContractCallOverrides {
	/**
	 * The address to execute the call as
	 */
	from?: string;
	/**
	 * The maximum units of gas for the transaction to use
	 */
	gasLimit?: number;
}
export type DimmCityV1BaseEvents = 'Approval' | 'ApprovalForAll' | 'ReleasePhaseChanged' | 'StateChanged' | 'Transfer';
export interface DimmCityV1BaseEventsContext {
	Approval(...parameters: any): EventFilter;
	ApprovalForAll(...parameters: any): EventFilter;
	ReleasePhaseChanged(...parameters: any): EventFilter;
	StateChanged(...parameters: any): EventFilter;
	Transfer(...parameters: any): EventFilter;
}
export type DimmCityV1BaseMethodNames =
	| 'Admins'
	| 'Markets'
	| 'MaxPack'
	| 'MaxSupply'
	| 'MetaDataUri'
	| 'ProxyRegistryAddress'
	| 'ReleasePhase'
	| 'WithdrawalAddress'
	| 'addAdmin'
	| 'addMarket'
	| 'approve'
	| 'balanceOf'
	| 'bulkUpdateCredits'
	| 'burn'
	| 'buyPack'
	| 'contractURI'
	| 'getApproved'
	| 'getPackCost'
	| 'getState'
	| 'getUserCredits'
	| 'isApprovedForAll'
	| 'name'
	| 'openPack'
	| 'owner'
	| 'ownerOf'
	| 'removeAdmin'
	| 'removeMarket'
	| 'safeTransferFrom'
	| 'safeTransferFrom'
	| 'sendPack'
	| 'setApprovalForAll'
	| 'setGuard'
	| 'setMaxPack'
	| 'setMaxSupply'
	| 'setMetaDataUri'
	| 'setProxyRegistryAddress'
	| 'setReleasePhase'
	| 'setState'
	| 'setStateCost'
	| 'setWithdawalAddress'
	| 'supportsInterface'
	| 'symbol'
	| 'tokenByIndex'
	| 'tokenOfOwnerByIndex'
	| 'tokenURI'
	| 'totalSupply'
	| 'transferFrom'
	| 'withdraw';
export interface ApprovalEventEmittedResponse {
	owner: string;
	approved: string;
	tokenId: BigNumberish;
}
export interface ApprovalForAllEventEmittedResponse {
	owner: string;
	operator: string;
	approved: boolean;
}
export interface ReleasePhaseChangedEventEmittedResponse {
	state: BigNumberish;
}
export interface StateChangedEventEmittedResponse {
	sender: string;
	tokenId: BigNumberish;
	state: BigNumberish;
}
export interface TransferEventEmittedResponse {
	from: string;
	to: string;
	tokenId: BigNumberish;
}
export interface DimmCityV1Base {
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param parameter0 Type: address, Indexed: false
	 */
	Admins(parameter0: string, overrides?: ContractCallOverrides): Promise<boolean>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param parameter0 Type: address, Indexed: false
	 */
	Markets(parameter0: string, overrides?: ContractCallOverrides): Promise<boolean>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	MaxPack(overrides?: ContractCallOverrides): Promise<number>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	MaxSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	MetaDataUri(overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	ProxyRegistryAddress(overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	ReleasePhase(overrides?: ContractCallOverrides): Promise<number>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	WithdrawalAddress(overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param newAdmin Type: address, Indexed: false
	 */
	addAdmin(newAdmin: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param newMarket Type: address, Indexed: false
	 */
	addMarket(newMarket: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 */
	approve(to: string, tokenId: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param owner Type: address, Indexed: false
	 */
	balanceOf(owner: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param list Type: address[], Indexed: false
	 * @param credits Type: uint8[], Indexed: false
	 */
	bulkUpdateCredits(
		list: string[],
		credits: BigNumberish[],
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 */
	burn(tokenId: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param to Type: address, Indexed: false
	 * @param numberOfTokens Type: uint8, Indexed: false
	 * @param openNow Type: bool, Indexed: false
	 */
	buyPack(
		to: string,
		numberOfTokens: BigNumberish,
		openNow: boolean,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	contractURI(overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 */
	getApproved(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	getPackCost(overrides?: ContractCallOverrides): Promise<BigNumber>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 */
	getState(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<number>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param wallet Type: address, Indexed: false
	 */
	getUserCredits(wallet: string, overrides?: ContractCallOverrides): Promise<number>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param _owner Type: address, Indexed: false
	 * @param operator Type: address, Indexed: false
	 */
	isApprovedForAll(_owner: string, operator: string, overrides?: ContractCallOverrides): Promise<boolean>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	name(overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param tokens Type: uint256[], Indexed: false
	 */
	openPack(tokens: BigNumberish[], overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	owner(overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 */
	ownerOf(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param admin Type: address, Indexed: false
	 */
	removeAdmin(admin: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param market Type: address, Indexed: false
	 */
	removeMarket(market: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param from Type: address, Indexed: false
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 */
	safeTransferFrom(
		from: string,
		to: string,
		tokenId: BigNumberish,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param from Type: address, Indexed: false
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 * @param data Type: bytes, Indexed: false
	 */
	safeTransferFrom(
		from: string,
		to: string,
		tokenId: BigNumberish,
		data: Arrayish,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param to Type: address, Indexed: false
	 * @param numberOfTokens Type: uint8, Indexed: false
	 */
	sendPack(
		to: string,
		numberOfTokens: BigNumberish,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param operator Type: address, Indexed: false
	 * @param approved Type: bool, Indexed: false
	 */
	setApprovalForAll(
		operator: string,
		approved: boolean,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param enabled Type: bool, Indexed: false
	 */
	setGuard(enabled: boolean, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param perPack Type: uint8, Indexed: false
	 */
	setMaxPack(perPack: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param supply Type: uint256, Indexed: false
	 */
	setMaxSupply(supply: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param baseURI Type: string, Indexed: false
	 */
	setMetaDataUri(baseURI: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param proxyAddress Type: address, Indexed: false
	 */
	setProxyRegistryAddress(proxyAddress: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param state Type: uint8, Indexed: false
	 */
	setReleasePhase(state: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 * @param state Type: int8, Indexed: false
	 */
	setState(
		tokenId: BigNumberish,
		state: BigNumberish,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param from Type: int8, Indexed: false
	 * @param to Type: int8, Indexed: false
	 * @param cost Type: uint256, Indexed: false
	 */
	setStateCost(
		from: BigNumberish,
		to: BigNumberish,
		cost: BigNumberish,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param newAddress Type: address, Indexed: false
	 */
	setWithdawalAddress(newAddress: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param interfaceId Type: bytes4, Indexed: false
	 */
	supportsInterface(interfaceId: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	symbol(overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param index Type: uint256, Indexed: false
	 */
	tokenByIndex(index: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param owner Type: address, Indexed: false
	 * @param index Type: uint256, Indexed: false
	 */
	tokenOfOwnerByIndex(owner: string, index: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 */
	tokenURI(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param from Type: address, Indexed: false
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 */
	transferFrom(
		from: string,
		to: string,
		tokenId: BigNumberish,
		overrides?: ContractTransactionOverrides
	): Promise<ContractTransaction>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 */
	withdraw(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
