/* eslint-disable @typescript-eslint/ban-ts-comment */

import { loadSearchPageFromStrapi } from '$lib/Shared/SvelteStrapi';

// @ts-ignore
export const load = async (page) => await loadSearchPageFromStrapi(page, 'dimm-city/factions');
