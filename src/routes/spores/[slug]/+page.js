import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {Promise<DC.Spore>}
 */
export const load = async (/** @type {{ params: { slug: any; }; }} */ page) =>
	await loadEntityPageFromStrapi(page, 'dimm-city/spores');



export const prerender = false;