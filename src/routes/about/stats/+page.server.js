import { config } from '$lib/Shared/config';

export const load = async () => {
	const response = await fetch(`${config.apiBaseUrl}/dimm-city/stats`);
	if (response.ok) {
		const json = await response.json();
		json.env = config.env;
		json.url = config.apiBaseUrl;
		return json;
	} else {
		console.error('Could not load stats', response);
		return {};
	}
};
