import qs from 'qs';
import { getSessionValue } from './Stores/StoreUtils';
import { StrapiClient } from './StrapiClient';
import { config } from './config';

/**
 * @param {string} contentType
 * @param {any} query
 */
function _getUrlWithQuery(contentType, query) {
	const stringifiedQuery = qs.stringify(query);
	return `${config.apiBaseUrl}/${contentType}?${stringifiedQuery}`;
}

/**
 * @param {(arg0: string) => any} _fetch
 * @param {string} contentType
 * @param {any} query
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
		console.error('Error in search:', error);
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
 * @param {{params: {slug: any;};}} page
 * @param {string} contentType
 * @param {any | undefined} [query]
 */
export async function loadEntityPageFromStrapi(page, contentType, query) {
	const slug = page.params.slug;
	const strapi = new StrapiClient(config.apiBaseUrl);
	const item = await strapi.loadBySlug(contentType, slug, query);
	return item ?? { attributes: {} };
}

/**
 * @param {any} contentType
 * @param {{ id: any; attributes: any; }} entity
 */
export async function updateEntity(contentType, entity) {
	let data = JSON.parse(JSON.stringify(entity));

	const strapi = new StrapiClient(config.apiBaseUrl, getSessionValue('jwt'));
	strapi.updateEntity(contentType, data);
}
