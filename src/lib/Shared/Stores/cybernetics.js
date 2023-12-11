import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getCybernetics() {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/cybernetics', config.defaultSummaryQuery);

	return results?.data;
}

/**
 * @param {any} _item
 */
export async function updateCyberneticsItem(_item) {
	console.log('updateCybernetics', _item);
}
