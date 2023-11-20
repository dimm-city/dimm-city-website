import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/**
 * Loads the entity page from Strapi.
 *
 * @param {Object} page - The page object containing the slug parameter.
 * @param {Function} page.fetch - The provided fetch function.
 * @param {Object} page.params - The page object containing the slug parameter.
 * @param {string} page.params.slug - The slug parameter.
 * @return {Promise<any>} A promise that resolves to the loaded entity page.
 */
export const load = async (page) => {
	const result = await loadEntityPageFromStrapi(page, 'dimm-city/pages');

	if (result?.id == null) {
		console.log('result.data is null', result);
		result.attributes = {
			title: 'Page not found',
			content: 'This is not the page you are looking for...'
		};
	}
	return result;
};

export const prerender = true;
export const csr = true;
export const ssr = true;
