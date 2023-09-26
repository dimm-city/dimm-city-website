import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {Promise<DC.BaseEntity>}
 */
export const load = async (/** @type {{ params: { slug: any; }; }} */ page) =>
	await loadEntityPageFromStrapi(page, 'dimm-city/stories');



export const prerender = 'auto';