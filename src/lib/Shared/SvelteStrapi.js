import { getSessionValue } from './Stores/StoreUtils';
import { Strapi } from './StrapiClient';
import { config } from './config';

/**
 * @param {{params: {pagination: any;sort: any;};}} page
 * @param {string} contentType
 */
export async function loadSearchPageFromStrapi(
	page,
	contentType,
	fields = ['slug', 'name', 'shortDescription', 'type', 'tags']
) {
	// pull page number, results per page, and sort order from query params
	const { pagination, sort } = page.params;

	// construct query object
	const query = {
		pagination,
		sort,
		fields,
		populate: {
			mainImage: {
				fields: ['url', 'formats', 'formats.thumbnail', 'formats.medium', 'formats.large']
			},
			
		}
	};

	const strapi = new Strapi(config.apiBaseUrl);
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
	const strapi = new Strapi(config.apiBaseUrl);
	const item = await strapi.loadBySlug(contentType, slug, query);
	return item ?? { attributes: {} };
}

/**
 * @param {any} contentType
 * @param {{ id: any; attributes: any; }} entity
 */
export async function updateEntity(contentType, entity) {

	let data = JSON.parse(JSON.stringify(entity));
	


	const strapi = new Strapi(config.apiBaseUrl, getSessionValue('jwt'));
	strapi.updateEntity(contentType, data);
}