import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getSpecialties() {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/specialties', config.defaultSummaryQuery);

	return results?.data;
}

export async function getFeaturedSpecialties(pageSize = 5) {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const query = { ...config.defaultSummaryQuery };
	if(query.pagination == null)
		query.pagination = {};

	query.pagination.pageSize = pageSize;
	const results = await strapi.search('dimm-city/specialties', query);
	return results?.data;
}
