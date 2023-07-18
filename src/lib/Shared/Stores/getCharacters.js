import { Strapi } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

const summaryRelationships = ['race', 'specialties', 'mainImage'];
const summaryFields = ['name', 'tokenId'];

/**
 * @param {Number[]} ids
 */
export async function getCharactersByIds(ids = []) {
	const strapi = new Strapi(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/characters', {
		sort: ['name:asc'],
		filters: {
			token: {
				id: {
					$in: ids
				}
			}
		},
		populate: summaryRelationships,
		fields: summaryFields,
		publicationState: 'live',
		locale: ['en']
	});

	return results;
}

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
						id: { $eq: userId }
					}
				}
			}
		},
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
	const strapi = new Strapi(config.apiBaseUrl);
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
	const strapi = new Strapi(config.apiBaseUrl);
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
