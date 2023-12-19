/**
 * @module SvelteStrapi
 */

import qs from 'qs';
import { getSessionValue } from './Stores/StoreUtils';
import { StrapiClient } from './StrapiClient';
import { config } from './config';

/**
 * @description Function to generate URL with query parameters for Strapi API.
 * @param {string} contentType - The content type of the resource.
 * @param {any} query - An object containing the query parameters.
 * @returns {string} - The generated URL with query parameters.
 */
function _getUrlWithQuery(contentType, query) {
	const stringifiedQuery = qs.stringify(query);
	return `${config.apiBaseUrl}/${contentType}?${stringifiedQuery}`;
}

/**
 * @description Function to search for resources in Strapi API.
 * @param {Function} _fetch - A function that fetches data from the server.
 * @param {string} contentType - The content type of the resource.
 * @param {any} query - An object containing the query parameters.
 * @returns {Promise<any>} - A promise that resolves with the search results.
 */
export async function search(_fetch, contentType, query) {
	const url = _getUrlWithQuery(contentType, query);

	try {
		const response = await _fetch(url);

		if (!response.ok) {
			throw new Error('Network response was not ok' + url);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 * @param {{params: {pagination: any;sort: any;};}} page
 * @param {string} contentType
 */
export async function loadSearchPageFromStrapi(
	page,
	contentType,
	fields = ['slug', 'name', 'shortDescription', 'tags'],
	populate = ['mainImage', 'mainVideo', 'mainModel']
) {
	// pull page number, results per page, and sort order from query params
	const { pagination, sort } = page.params;

	// construct query object
	const query = {
		pagination,
		sort,
		fields,
		populate
	};

	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search(contentType, query);

	return results;
}

/**
 * @description Function to load resources by slug from Strapi API.
 * @param {any} page - An object containing the fetch function and params.
 * @param {string} contentType - The content type of the resource.
 * @param {any | undefined} [query] - An optional query parameter object.
 * @returns {Promise<any>} - A promise that resolves with the loaded entity.
 */
export async function loadEntityPageFromStrapi(page, contentType, query) {
	const slug = page.params.slug;
	const strapi = new StrapiClient(config.apiBaseUrl, '', page.fetch);
	const item = await strapi.loadBySlug(contentType, slug, query);
	return item ?? { attributes: {} };
}

/**
 * @description Function to update an entity in Strapi API.
 * @param {string} contentType - The content type of the resource.
 * @param {any} entity - An object containing the updated data for the entity.
 * @returns {Promise<void>} - A promise that resolves when the entity is updated.
 */
export async function updateEntity(contentType, entity) {
	let data = JSON.parse(JSON.stringify(entity));

	const strapi = new StrapiClient(config.apiBaseUrl, getSessionValue('jwt'));
	return strapi.updateEntity(contentType, data);
}
