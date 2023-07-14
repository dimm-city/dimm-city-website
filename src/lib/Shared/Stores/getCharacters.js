import { Strapi } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

/**
 * @param {Number} userId
 */
export async function getCharactersByUser(userId) {
	const strapi = new Strapi(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/characters', {
		sort: ['name:asc'],
		filters: {
			token: {
				wallet: {
					user: {
						id: userId
					}
				}
			}
		},
		fields: ['name', 'tokenId'],
		populate: ['race', 'specialties', 'mainImage'],
		publicationState: 'live',
		locale: ['en']
	});

	return results;
}


/**
 * @param {string} tokenId
 */
export async function getCharacterByTokenId(tokenId) {
	const strapi = new Strapi(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/characters', {
		sort: ['name:asc'],
		filters: {
			token: {
				id: tokenId
			}
		},
		populate: '*',
		fields: ['name', 'slug', 'shortDescription'],
		// pagination: {
		// 	pageSize: 20,
		// 	page: 1
		// },
		publicationState: 'live',
		locale: ['en']
	});

	return results?.data?.at(0);
}