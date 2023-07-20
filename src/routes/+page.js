
import { search } from '$lib/Shared/SvelteStrapi';
import { config } from '$lib/Shared/config';

/**
 *
 * @param {any} params
 * @returns {Promise<any>}
 */
export const load = async (params) => {
	const { fetch } = params;
	const latestNews = await search(fetch, 'dimm-city/journal-entries', {
		...config.defaultSummaryQuery,
		pagination: {
			page: 1,
			pageSize: 5,
			pageCount: 1,
			total: 1
		},
		filters: { tags: { $containsi: ['featured'] } }
	});
	const citizens = await search(fetch, 'dimm-city/characters', {
		sort: ['name:asc'],
		populate: ['race', 'specialties', 'mainImage'],
		fields: ['name', 'tokenId'],
		pagination: {
			pageSize: 5,
			page: 1
		},
		publicationState: 'live'
	});
	const districts = await search(fetch, 'dimm-city/locations', {
		...config.defaultSummaryQuery,
		filters: {
			region: {
				id: {
					$null: true
				}
			}
		},
		pagination: {
			pageSize: 5,
			page: 1
		}
	});
	const specialties = await search(fetch, 'dimm-city/specialties', {
		...config.defaultSummaryQuery,
		pagination: {
			pageSize: 5,
			page: 1
		}
	});

	const data = {
		latestNews: latestNews.data,
		districts: districts.data,
		specialties: specialties.data,
		citizens: citizens.data
	};

	console.log(data);
	return data;
};
export const prerender = true;
export const ssr = true;
