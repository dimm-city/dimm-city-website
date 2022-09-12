
import type { ISummaryItem } from '$lib/Shared/ISummaryItem';
import { config } from '$lib/Shared/config';
export const getDistrictsQuery = `
query {
	locations(filters: { region: { id: { eq: null } } }) {
		data {
			id
			attributes {
				slug
				name
				description
				shortDescription
				mainImage {
					data {
						attributes {
							url
							previewUrl
						}
					}
				}
			}
		}
	}
}`;

export async function getDistricts() : Promise<ISummaryItem[]> {
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getDistrictsQuery
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();

				return json.data.locations.data.map((i) => {
					return {
						id: i.id,
						slug: i.attributes.slug,
						name: i.attributes.name,
						description: i.attributes.description ?? 'no information on this subject...',
						thumbnailUrl: i.attributes.mainImage?.data?.attributes?.previewUrl,
						imageUrl: i.attributes.mainImage?.data?.attributes?.url
					};
				}).sort((a,b) => a.name > b.name ? 1 : -1);
			}
			return [];
		})
		.catch((reason) => {
			console.log('loadDistricts failed', reason);
		});
}