import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getScripts() {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/scripts', config.defaultSummaryQuery);

	return results?.data;
}

/**
 * @param {any} _item
 */
export async function updateScriptsItem(_item) {
	console.log('updateScriptsItem', _item);
}
