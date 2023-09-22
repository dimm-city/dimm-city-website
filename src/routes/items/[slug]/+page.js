import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @param {{ params: { slug: any; }; }} page; params: { slug: any; }} page
 * @returns {Promise<DC.Item>}
 */
export const load = async function (page) {
    return await loadEntityPageFromStrapi(page, 'dimm-city/items');
};

