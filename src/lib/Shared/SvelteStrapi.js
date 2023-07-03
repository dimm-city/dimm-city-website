import { Strapi } from "./StrapiClient";
import { config } from "./config";

/**
 * @param {{params: {pagination: any;sort: any;};}} page
 * @param {string} contentType
 */
export async function loadSearchPageFromStrapi(page, contentType, fields = ['slug', 'name', 'shortDescription', 'type']) {
	// pull page number, results per page, and sort order from query params
	const { pagination, sort } = page.params;

	// construct query object
	const query = {
		pagination,
		sort,
		fields
	};

	const strapi = new Strapi(config.apiBaseUrl);
	const results = await strapi.search(contentType, query);

	return results;
}

/**
 * @param {{ params: { slug: any; }; }} page
 * @param {string} contentType
 */
export async function loadEntityPageFromStrapi(page, contentType) {
	const slug = page.params.slug;
	const strapi = new Strapi(config.apiBaseUrl);
	const item = await strapi.loadBySlug(contentType, slug);
	return item;
}
