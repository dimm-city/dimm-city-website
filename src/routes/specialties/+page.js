import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/**
 * dimm  
 * @returns {Promise<Strapi.APIResponse<DC.Specialty[]>>} */
export const load = async (/** @type {{ params: { pagination: any; sort: any; }; }} */ page) =>
	await loadSearchPageFromStrapi(page, 'dimm-city/specialties', [
		'name',
		'slug',
		'shortDescription'
	]);
