import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {DC.Race}
 */
export const load = (async (/** @type {{ params: { slug: any; }; }} */ page) => await loadEntityPageFromStrapi(page, 'dimm-city/races'));


export const prerender = 'auto';