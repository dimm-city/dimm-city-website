import { config } from '$lib/Shared/config';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await fetch(`${config.apiBaseUrl}/dimm-city/stats`);
	if (response.ok) return await response.json();
	else {
		console.error('Could not load stats', response);
		return {};
	}
}) satisfies PageServerLoad;
