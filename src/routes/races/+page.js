import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';
export const load = async (page) => await loadSearchPageFromStrapi(page, 'races');