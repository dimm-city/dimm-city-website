import { Strapi } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';


export async function getDistricts() {
	const strapi = new Strapi(config.apiBaseUrl);
	const query = {...config.defaultSummaryQuery};
	query.filters = {
		region: {
			id: {
				$null: true
			}
		}
	};
	const results = await strapi.search('dimm-city/locations', query);

	return results?.data;
}