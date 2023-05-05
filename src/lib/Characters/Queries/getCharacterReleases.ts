import { config } from '$lib/Shared/config';
import type { ICharacterRelease } from '../Models/ICharacterRelease';

export const getCharacterReleasesQuery = `
query getCharacterReleases{
	characterReleases{
	  data{
		id
		attributes{
		name
		slug
		description
				metadata	
		contract{
			data{
			attributes{
				address	
				totalSupply
				maxSupply
				price
        abi
			}
			}
		}
		
		imageUrl
		videoUrl
		thumbnailUrl
		tags
		icon
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

				const output = json.data.characterReleases.data.map(
					(r: { attributes: any; id: string }) => {
						const item = { ...r.attributes };
						item.id = r.id;
						item.contract = { ...item.contract.data.attributes}
						return item;
					}
				);
				return output;
			}
			return new Array<ICharacterRelease>();
		})
		.catch((reason) => {
			console.log('getCharacterReleases failed', reason);
			return new Array<ICharacterRelease>();
		});
}
