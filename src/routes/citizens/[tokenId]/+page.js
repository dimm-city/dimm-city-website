import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {Promise<DC.Character>}
 */
export const load = async (/** @type {{ params: any; }} */ page) => {
	const tokenId = page.params.tokenId;
	let data = await loadEntityPageFromStrapi(page, 'dimm-city/characters', {
		filters: {
			tokenId: {
				$eq: tokenId
			}
		},
		populate: "*"
	});
	return data;
};
