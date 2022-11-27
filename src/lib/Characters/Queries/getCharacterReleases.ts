import { config } from '$lib/Shared/config';
import type { ICharacterRelease } from '../Components/ICharacterRelease';

export const getCharacterReleasesQuery = `
	query getCharacterReleases{
		characterReleases{
		data{
			id
			attributes{
			name
			slug
			description
			contractAddress
			metadata
			abi
			totalSupply
			maxSupply
			price
			imageUrl
			videoUrl
			thumbnailUrl
			tags
			authors {
			data{
				attributes {					
				address
				}
				}
			}
			}
		}
		}
	}
`;

export function getCharacterReleases(): Promise<Array<ICharacterRelease>> {
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getCharacterReleasesQuery,
			variables: { env: 'prod' }
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();
				console.log('release data', json);
				
				
				// return new Array<ICharacterRelease>(
				// 	...[
				// 		{
				// 			id: 1,
				// 			name: 'DCS1R1: Rabbits',
				// 			slug: 'dcs1r1',
				// 			description: 'Cute and terrifying...',
				// 			imageUrl: 'https://files.dimm.city/assets/specialties/augmerc.png',
				// 			videoUrl: 'https://files.dimm.city/assets/specialties/augmerc.mp4',
				// 			thumbnailUrl: '',
				// 			tags: '',
				// 			author: '',
				// 			config: {
				// 				name: 'mainnet',
				// 				chainId: 1,
				// 				address: '0xeF48DF1d388aa7222Da0B83d8b7CB265EF8d0B4a',
				// 				metadataBaseUri: 'http://localhost:1337/api/metadata/sporos/dcs1r1',
				// 				abi: [
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'approved',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'Approval',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'operator',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: false,
				// 								internalType: 'bool',
				// 								name: 'approved',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'ApprovalForAll',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint8',
				// 								name: 'state',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'ReleasePhaseChanged',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'sender',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'int8',
				// 								name: 'state',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						name: 'StateChanged',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'Transfer',
				// 						type: 'event'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'Admins',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'Markets',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'MaxPack',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: '',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'MaxSupply',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'MetaDataUri',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'ProxyRegistryAddress',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'ReleasePhase',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: '',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'WithdrawalAddress',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'newAdmin',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'addAdmin',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'newMarket',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'addMarket',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'approve',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'balanceOf',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address[]',
				// 								name: 'list',
				// 								type: 'address[]'
				// 							},
				// 							{
				// 								internalType: 'uint8[]',
				// 								name: 'credits',
				// 								type: 'uint8[]'
				// 							}
				// 						],
				// 						name: 'bulkUpdateCredits',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'burn',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'numberOfTokens',
				// 								type: 'uint8'
				// 							},
				// 							{
				// 								internalType: 'bool',
				// 								name: 'openNow',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'buyPack',
				// 						outputs: [],
				// 						stateMutability: 'payable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'contractURI',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'getApproved',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'getPackCost',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'getState',
				// 						outputs: [
				// 							{
				// 								internalType: 'int8',
				// 								name: '',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'wallet',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'getUserCredits',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'credits',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '_owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'operator',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'isApprovedForAll',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'name',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256[]',
				// 								name: 'tokens',
				// 								type: 'uint256[]'
				// 							}
				// 						],
				// 						name: 'openPack',
				// 						outputs: [],
				// 						stateMutability: 'payable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'owner',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'ownerOf',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'admin',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'removeAdmin',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'market',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'removeMarket',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'safeTransferFrom',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							},
				// 							{
				// 								internalType: 'bytes',
				// 								name: 'data',
				// 								type: 'bytes'
				// 							}
				// 						],
				// 						name: 'safeTransferFrom',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'numberOfTokens',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'sendPack',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'operator',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'bool',
				// 								name: 'approved',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'setApprovalForAll',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: 'enabled',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'setGuard',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'perPack',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'setMaxPack',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'supply',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'setMaxSupply',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: 'baseURI',
				// 								type: 'string'
				// 							}
				// 						],
				// 						name: 'setMetaDataUri',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'proxyAddress',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'setProxyRegistryAddress',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'state',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'setReleasePhase',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							},
				// 							{
				// 								internalType: 'int8',
				// 								name: 'state',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						name: 'setState',
				// 						outputs: [
				// 							{
				// 								internalType: 'int8',
				// 								name: '',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						stateMutability: 'payable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'int8',
				// 								name: 'from',
				// 								type: 'int8'
				// 							},
				// 							{
				// 								internalType: 'int8',
				// 								name: 'to',
				// 								type: 'int8'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'cost',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'setStateCost',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'newAddress',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'setWithdawalAddress',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'bytes4',
				// 								name: 'interfaceId',
				// 								type: 'bytes4'
				// 							}
				// 						],
				// 						name: 'supportsInterface',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'symbol',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'index',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'tokenByIndex',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'index',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'tokenOfOwnerByIndex',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'tokenURI',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'totalSupply',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'transferFrom',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'withdraw',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					}
				// 				]
				// 			}
				// 		},
				// 		{
				// 			id: 2,
				// 			name: 'DCS2R1: Second Seed',
				// 			slug: 'dcs2r1',
				// 			description: "They're back and they're not happy...",
				// 			imageUrl: 'https://files.dimm.city/assets/specialties/technosorcerer.png',
				// 			videoUrl: 'https://files.dimm.city/assets/specialties/technosorcerer.mp4',
				// 			thumbnailUrl: '',
				// 			tags: '',
				// 			author: '',
				// 			config: {
				// 				name: 'mainnet',
				// 				chainId: 1,
				// 				address: '0xeF48DF1d388aa7222Da0B83d8b7CB265EF8d0B4a',
				// 				metadataBaseUri: 'https://data.dimm.city/api/metadata/sporos/dcs1r1',
				// 				abi: [
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'approved',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'Approval',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'operator',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: false,
				// 								internalType: 'bool',
				// 								name: 'approved',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'ApprovalForAll',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint8',
				// 								name: 'state',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'ReleasePhaseChanged',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'sender',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'int8',
				// 								name: 'state',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						name: 'StateChanged',
				// 						type: 'event'
				// 					},
				// 					{
				// 						anonymous: false,
				// 						inputs: [
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								indexed: true,
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'Transfer',
				// 						type: 'event'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'Admins',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'Markets',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'MaxPack',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: '',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'MaxSupply',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'MetaDataUri',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'ProxyRegistryAddress',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'ReleasePhase',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: '',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'WithdrawalAddress',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'newAdmin',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'addAdmin',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'newMarket',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'addMarket',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'approve',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'balanceOf',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address[]',
				// 								name: 'list',
				// 								type: 'address[]'
				// 							},
				// 							{
				// 								internalType: 'uint8[]',
				// 								name: 'credits',
				// 								type: 'uint8[]'
				// 							}
				// 						],
				// 						name: 'bulkUpdateCredits',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'burn',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'numberOfTokens',
				// 								type: 'uint8'
				// 							},
				// 							{
				// 								internalType: 'bool',
				// 								name: 'openNow',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'buyPack',
				// 						outputs: [],
				// 						stateMutability: 'payable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'contractURI',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'getApproved',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'getPackCost',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'getState',
				// 						outputs: [
				// 							{
				// 								internalType: 'int8',
				// 								name: '',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'wallet',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'getUserCredits',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'credits',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '_owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'operator',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'isApprovedForAll',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'name',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256[]',
				// 								name: 'tokens',
				// 								type: 'uint256[]'
				// 							}
				// 						],
				// 						name: 'openPack',
				// 						outputs: [],
				// 						stateMutability: 'payable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'owner',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'ownerOf',
				// 						outputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: '',
				// 								type: 'address'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'admin',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'removeAdmin',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'market',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'removeMarket',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'safeTransferFrom',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							},
				// 							{
				// 								internalType: 'bytes',
				// 								name: 'data',
				// 								type: 'bytes'
				// 							}
				// 						],
				// 						name: 'safeTransferFrom',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'numberOfTokens',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'sendPack',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'operator',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'bool',
				// 								name: 'approved',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'setApprovalForAll',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: 'enabled',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						name: 'setGuard',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'perPack',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'setMaxPack',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'supply',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'setMaxSupply',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: 'baseURI',
				// 								type: 'string'
				// 							}
				// 						],
				// 						name: 'setMetaDataUri',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'proxyAddress',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'setProxyRegistryAddress',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint8',
				// 								name: 'state',
				// 								type: 'uint8'
				// 							}
				// 						],
				// 						name: 'setReleasePhase',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							},
				// 							{
				// 								internalType: 'int8',
				// 								name: 'state',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						name: 'setState',
				// 						outputs: [
				// 							{
				// 								internalType: 'int8',
				// 								name: '',
				// 								type: 'int8'
				// 							}
				// 						],
				// 						stateMutability: 'payable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'int8',
				// 								name: 'from',
				// 								type: 'int8'
				// 							},
				// 							{
				// 								internalType: 'int8',
				// 								name: 'to',
				// 								type: 'int8'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'cost',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'setStateCost',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'newAddress',
				// 								type: 'address'
				// 							}
				// 						],
				// 						name: 'setWithdawalAddress',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'bytes4',
				// 								name: 'interfaceId',
				// 								type: 'bytes4'
				// 							}
				// 						],
				// 						name: 'supportsInterface',
				// 						outputs: [
				// 							{
				// 								internalType: 'bool',
				// 								name: '',
				// 								type: 'bool'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'symbol',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'index',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'tokenByIndex',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'owner',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'index',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'tokenOfOwnerByIndex',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'tokenURI',
				// 						outputs: [
				// 							{
				// 								internalType: 'string',
				// 								name: '',
				// 								type: 'string'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'totalSupply',
				// 						outputs: [
				// 							{
				// 								internalType: 'uint256',
				// 								name: '',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						stateMutability: 'view',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [
				// 							{
				// 								internalType: 'address',
				// 								name: 'from',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'address',
				// 								name: 'to',
				// 								type: 'address'
				// 							},
				// 							{
				// 								internalType: 'uint256',
				// 								name: 'tokenId',
				// 								type: 'uint256'
				// 							}
				// 						],
				// 						name: 'transferFrom',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					},
				// 					{
				// 						inputs: [],
				// 						name: 'withdraw',
				// 						outputs: [],
				// 						stateMutability: 'nonpayable',
				// 						type: 'function'
				// 					}
				// 				]
				// 			}
				// 		}
				// 	]
				// );
				const output = json.data.characterReleases.data.map((r) => {
					const item = { ...r.attributes };
					item.id = r.id;
					return item;
				});
				return output;
			}
			return new Array<ICharacterRelease>();
		})
		.catch((reason) => {
			console.log('getCharacterReleases failed', reason);
			return new Array<ICharacterRelease>();
		});
}
