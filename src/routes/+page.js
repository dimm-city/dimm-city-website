import { loadEntityPageFromStrapi, search } from '$lib/Shared/SvelteStrapi';

/**
 * Loads the entity page from Strapi.
 *
 * @param {Object} page - The page object containing the slug parameter.
 * @param {Object} page.params - The page object containing the slug parameter.
 * @param {string} page.params.slug - The slug parameter.
 * @return {Promise<any>} A promise that resolves to the loaded entity page.
 */
export const load = async (/** @type {{ params: { slug: any; }; }} */ page) => {
    const _fetch = page.fetch;
	const pageData = await search(_fetch, 'dimm-city/pages', {
		filters: {
			$or: [
				{
					slug: {
						$eq: 'home'
					}
				},
				{
					slug: {
						$eq: 'home-public'
					}
				}
			]
		}
	});

    if (!pageData.data) {
        console.log('pageData.data is null', pageData);
        return {
            public: null,
            loggedIn: null
        };
    }

	const data = {        
        public: pageData.data?.find((item) => item.attributes.slug === 'home-public'),
        loggedIn: pageData.data?.find((item) => item.attributes.slug === 'home')
    };

    return data;
};
//export const prerender = true;
export const ssr = false;
// export const csr = true;
