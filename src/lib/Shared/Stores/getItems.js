import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getItems() {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/items', config.defaultSummaryQuery);

	return results?.data;
}

/**
 * @param {any} _item
 */
export async function updateInventoryItem(_item) {
	//update the character's inventory/
	console.log('updateInventoryItem', _item);
}
