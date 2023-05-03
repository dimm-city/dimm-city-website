
import type { ISummaryItem } from '$lib/Shared/Models/ISummaryItem';
import { config } from '$lib/Shared/config';
export const getSpecialtiesQuery = `
query {
	specialties {
		data {
			id
			attributes {
				slug
				name
				description
				shortDescription
				imageUrl
			}
		}
	}
}`;

export async function getSpecialties() : Promise<ISummaryItem[]> {
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getSpecialtiesQuery
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();

				return json.data.specialties.data.map((i) => {
					return {
						id: i.id,
						slug: i.attributes.slug,
						name: i.attributes.name,
						description: i.attributes.description ?? 'no information on this subject...',
						shortDescription: i.attributes.shortDescription ?? 'no information on this subject...',
						thumbnailUrl: i.attributes.mainImage?.data?.attributes?.previewUrl,
						imageUrl: i.attributes.mainImage?.data?.attributes?.url,
						attributes: i.attributes
					};
				}).sort((a,b) => a.name > b.name ? 1 : -1);
			}
			return [];
		})
		.catch((reason) => {
			console.log('getSpecialties failed', reason);
		});
}