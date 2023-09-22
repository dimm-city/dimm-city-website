import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/** @returns {Promise<DC.Race[]>} */
export const load = async function (
	/** @type {{ params: { pagination: any; sort: any; }; }} */ page
) {
	return await loadSearchPageFromStrapi(page, 'dimm-city/races');
};
