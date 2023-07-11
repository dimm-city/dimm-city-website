import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {DC.Specialty}
 */
export const load = (async (/** @type {{ params: { slug: any; }; }} */ page) => await loadEntityPageFromStrapi(page, 'dimm-city/specialties'));

