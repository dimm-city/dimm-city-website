import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';
export const load = async (/** @type {{ params: { pagination: any; sort: any; }; }} */ page) => {
	return await loadSearchPageFromStrapi(page, 'dimm-city/characters', [
		'name',
		'tokenId',
		'vibe'
	]);
};
