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
		populate: {
			mainImage: true,
			race: true,
			originLocation: true,
			currentLocation: true,
			selectedAbilities: true,
			specialties: {
				populate: {
					skillTrees: true
				}
			},
			scripts: {
				populate: {
					item: true
				}
			},
			inventory: {
				populate: {
					item: true
				}
			},
			cybernetics: {
				populate: {
					item: true
				}
			}
		}
	});
	return data;
};

export const prerender = 'auto';
