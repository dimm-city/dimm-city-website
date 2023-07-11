import { Strapi } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';


export async function getSpecialties() {
	const strapi = new Strapi(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/specialties', {
		sort: ['name:asc'],
		filters: {
			region: {
				id: {
					$null: true
				}
			}
		},
		populate: 'mainImage',
		fields: ['name', 'slug', 'shortDescription'],
		// pagination: {
		// 	pageSize: 20,
		// 	page: 1
		// },
		publicationState: 'live',
		locale: ['en']
	});

	return results.data;
}