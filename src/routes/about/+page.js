import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/**
 * Loads the entity page from Strapi.
 *
 * @param {Object} page - The page object containing the slug parameter.
 * @param {Object} page.params - The page object containing the slug parameter.
 * @param {string} page.params.slug - The slug parameter.
 * @return {Promise<any>} A promise that resolves to the loaded entity page.
 */
export const load = async (/** @type {{ params: { slug: any; }; }} */ page) =>
	await loadEntityPageFromStrapi(page, 'dimm-city/pages');

export const prerender = true;
export const csr = true;
export const ssr = true;
