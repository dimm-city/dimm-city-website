import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/** @returns {Promise<DC.HistoricalEvent>} */
export const load = async (/** @type {{ params: { pagination: any; sort: any; }; }} */ page) =>
	await loadSearchPageFromStrapi(page, 'dimm-city/historical-events');
