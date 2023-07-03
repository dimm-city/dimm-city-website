import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';
/**
 * @returns {id: Number, attributes: { slug: string, name: any; type: any; shortDescription: any; imageUrl: any; modelUrl: any; videoUrl: any; description: any; }}
 */
export const load = (async (page) => await loadEntityPageFromStrapi(page, 'items'));

