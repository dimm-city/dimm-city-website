import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {Faction}
 */
export const load = (async (page) => await loadEntityPageFromStrapi(page, 'dimm-city/factions'));

