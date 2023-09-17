import { config } from '$lib/Shared/config';

export const load = async () => {
	console.log(config.apiBaseUrl);
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

export const csr = true;
export const ssr = false;
export const prerender = false;