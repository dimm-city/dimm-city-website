import { loadEntityPageFromStrapi, loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';

export const load = async function (
	 page
) {
	const spores = await loadSearchPageFromStrapi(page, 'dimm-city/spores');
	const pageData = await  loadEntityPageFromStrapi(page, 'dimm-city/pages', {
		filters: {
			slug: {
				$eq: 'spores'
			}
		}
	});
	return {
		spores,
		pageData
	};
};
