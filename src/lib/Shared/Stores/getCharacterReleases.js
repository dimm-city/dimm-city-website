import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getCharacterReleases() {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/characters', {
		sort: ['name:asc'],
		populate: ['mainImage', 'mainVideo'],
		fields: ['name', 'slug', 'shortDescription'],
		// pagination: {
		// 	pageSize: 20,
		// 	page: 1
		// },
		publicationState: 'live',
		locale: ['en']
	});

	return results;
}