import { Strapi } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getSpores() {
	const strapi = new Strapi(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/spores', config.defaultSummaryQuery);

	return results?.data;
}
