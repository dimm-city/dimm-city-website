import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export const summaryRelationships = ['race', 'specialties', 'mainImage'];
export const summaryFields = ['name', 'tokenId'];

/**
 * @param {Number[]} ids
 */
export async function getCharactersByIds(
	ids = [],
	fields = summaryFields,
	populate = summaryRelationships
) {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/characters', {
		sort: ['name:asc'],
		filters: {
			token: {
				id: {
					$in: ids
				}
			}
		},
		populate: populate,
		fields: fields,
		publicationState: 'live',
		locale: ['en']
	});

	return results;
}

/**
 * @param {string} jwt
 */
export async function getCharactersByUser(jwt) {
	const strapi = new StrapiClient(config.apiBaseUrl, jwt);
	const results = await strapi.search('dimm-city/profiles/tokens', {
		sort: ['name:asc'],		
		fields: summaryFields,
		populate: summaryRelationships,
		publicationState: 'live',
		locale: ['en']
	});

	return results;
}

/**
 * @param {string} tokenId
 */
export async function getCharacterByTokenId(tokenId) {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/characters', {
		sort: ['name:asc'],
		filters: {
			token: {
				id: tokenId
			}
		},
		populate: '*',
		fields: '*',
		// pagination: {
		// 	pageSize: 20,
		// 	page: 1
		// },
		publicationState: 'live',
		locale: ['en']
	});

	return results?.data?.at(0);
}

export async function getLatestCharacters(pageSize = 5) {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/characters', {
		sort: ['name:asc'],
		populate: summaryRelationships,
		fields: summaryFields,
		pagination: {
			pageSize: pageSize,
			page: 1
		},
		publicationState: 'live',
		locale: ['en']
	});

	return results?.data;
}
