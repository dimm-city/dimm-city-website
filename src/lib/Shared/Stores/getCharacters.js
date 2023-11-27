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
 * Retrieves characters associated with a user.
 * @param {string} jwt - The JSON Web Token for authentication.
 * @returns {Promise<Strapi.APIResponse<DC.Character>>} - A promise that resolves to an array of character objects.
 */
export async function getCharactersByUser(jwt) {
	// Create a new instance of the StrapiClient with the API base URL and JWT.
	const strapi = new StrapiClient(config.apiBaseUrl, jwt);

	// Use the StrapiClient to search for profiles/tokens in the 'dimm-city' collection.
	// Sort the results by name in ascending order.
	// Include only the specified fields and relationships in the results.
	// Filter the results to only include live records in the 'en' locale.
	const results = await strapi.search('dimm-city/my/characters', {
		sort: ['name:asc']
	});

	// Return the search results.
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
