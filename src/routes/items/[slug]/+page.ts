import { Strapi } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';
import type { PageLoad } from './$types';
/**
 * @returns {id: Number, attributes: { slug: string, name: any; type: any; shortDescription: any; imageUrl: any; modelUrl: any; videoUrl: any; description: any; }}
 */
export const load = (async (page) => {
	const slug = page.params.slug;
	const strapi = new Strapi(config.apiBaseUrl);
	const item = await strapi.loadBySlug('items', slug);
	return item;
}) satisfies PageLoad;
