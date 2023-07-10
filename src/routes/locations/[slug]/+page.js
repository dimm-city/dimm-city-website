import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {Promise<DC.Location>}
 */
export const load = async (/** @type {{ params: { slug: any; }; }} */ page) =>
	await loadEntityPageFromStrapi(page, 'dimm-city/locations');
