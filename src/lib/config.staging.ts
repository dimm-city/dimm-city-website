export const config = {
	version: '0.2.0',
	graphUrl: 'https://data.dimm.city/graphql',
	baseUrl: 'azure',
	releases: {
		s1r1: {
			name: 'Sporo Rabbits',
			maxTokens: 10,
			networks: [
				{
					name: 'mainnet',
					chainId: 1,
					address: '0xeF48DF1d388aa7222Da0B83d8b7CB265EF8d0B4a',
					metadataBaseUri: 'https://data.dimm.city/api/token-metadata/sporos/s1r1' // "/api/v1/sporos/s1r1",
					//metadataBaseUri: 'http://localhost:1337/api/token-metadata/sporos/s1r1',
				},
				{
					name: 'rinkeby',
					chainId: 4,
					address: '0x8Cfd5Fb8B806FDb5bf1Cd1949a2561Aa8b592Ef9', //"0x43Ea1a9d3945BB5A64e6C66506d55308525d8a87", // "0xbB2a603Ae60AeD5f538787bD55b1F37e544008B1", //"0x643908D555Bd3845F0D424eFd22e92C468AE360A",
					metadataBaseUri: 'https://data.dimm.city/api/token-metadata/sporos/s1r1'
					//metadataBaseUri: 'http://localhost:1337/api/token-metadata/sporos/s1r1',
				}
			]
		}
	}
};
