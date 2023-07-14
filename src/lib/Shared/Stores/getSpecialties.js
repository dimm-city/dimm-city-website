import { Strapi } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getSpecialties() {
	const strapi = new Strapi(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/specialties', config.defaultSummaryQuery);

	return results?.data;
}

export async function getFeaturedSpecialties(pageSize = 5) {
	const strapi = new Strapi(config.apiBaseUrl);
	const query = { ...config.defaultSummaryQuery };
	if(query.pagination == null)
		query.pagination = {};

	query.pagination.pageSize = pageSize;
	const results = await strapi.search('dimm-city/specialties', query);
	console.log('featured specialties', results);
	return results?.data;
}
