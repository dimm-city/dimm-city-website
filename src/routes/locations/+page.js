import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/** @param {any} page */
export const load = async (page) => {
	return await loadSearchPageFromStrapi(page, 'dimm-city/locations');
};
