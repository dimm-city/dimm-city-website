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
				imageUrl
				thumbnailUrl
			}
		}
	}
}`;

export async function getDistricts(searchText = '') {
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

				return json.data.locations.data
					.map((i) => {
						const item = { ...i.attributes };
						item.attributes = i.attributes;
						item.id = i.id;
						item.type = 'location';
						item.url = `/archive/locations/${item.slug}`;
						if (!item.tags) item.tags = [];
						if (!item.tags?.some((t) => t == 'district')) item.tags.push('district');
						if (!item.tags?.some((t) => t == 'region')) item.tags.push('location');

						return item;
					})
					.sort((a, b) => (a.name > b.name ? 1 : -1));
			}
			return [];
		})
		.catch((reason) => {
			console.log('getDistricts failed', reason);
		});
}
