import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

export async function getJournalEntries() {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const results = await strapi.search('dimm-city/journal-entries', config.defaultSummaryQuery);

	return results?.data;
}

export async function getFeaturedJournalEntries(pageSize = 5) {
	const strapi = new StrapiClient(config.apiBaseUrl);
	const query = { ...config.defaultSummaryQuery };
	
	 query.pagination = {
		page: 1,
		pageSize: pageSize,	
		pageCount: 1,
		total: 1,
	};

	query.filters = { tags: { $containsi: ['featured'] } };
	const results = await strapi.search('dimm-city/journal-entries', query);
	return results?.data;
}
