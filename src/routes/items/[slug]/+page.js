import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @param {import('../$types').PageData} page
 * @returns {DC.Item}
 */
export const load = (async (page) => await loadEntityPageFromStrapi(page, 'dimm-city/items'));

