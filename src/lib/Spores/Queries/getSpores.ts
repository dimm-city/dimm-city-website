
import type { ISummaryItem } from '$lib/Shared/Models/ISummaryItem';
import { config } from '$lib/Shared/config';
export const query = `
query {
	spores {
		data {
			id
			attributes {
				slug
				name
				description
				imageUrl
			}
		}
	}
}`;

export async function getSpores() : Promise<ISummaryItem[]> {
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: query
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();

				return json.data.spores.data.map((i) => {
					return {
						id: i.id,
						slug: i.attributes.slug,
						url: '/spores/' + i.attributes.slug,
						name: i.attributes.name,
						description: i.attributes.description ?? 'no information on this subject...',
						shortDescription:  i.attributes.description ?? 'no information on this subject...',
						thumbnailUrl: i.attributes.thumbnailUrl,
						imageUrl: i.attributes.imageUrl
					};
				}).sort((a,b) => a.name > b.name ? 1 : -1);
			}
			return [];
		})
		.catch((reason) => {
			console.log('loadSpecialties failed', reason);
		});
}