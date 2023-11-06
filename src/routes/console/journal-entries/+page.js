import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';

export const load = async (/** @type {{ params: { pagination: any; sort: any; }; }} */ page) =>
	await loadSearchPageFromStrapi(page, 'dimm-city/journal-entries');
