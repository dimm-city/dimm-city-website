import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';
export const load = async (page) => { return await loadSearchPageFromStrapi(page, 'items')};
