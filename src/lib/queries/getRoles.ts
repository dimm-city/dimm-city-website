import { config } from '../config';
const getSpecialtiesQuery = `
query {
	specialties {    
		data {
			id
			attributes {
				slug
				name
				description
				shortDescription
				skillTrees {
					data {
						attributes{
						name
						slug
						abilities {
							data {
								attributes {
									name
									slug
									}
								}
							}	
						}
					}
				}			
			}
		}
	}
}`;

export function loadSpecialties() {
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
						description:
							i.attributes.shortDescription ?? i.attributes.description ?? 'no information on this subject...',
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
