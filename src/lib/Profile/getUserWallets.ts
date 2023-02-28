import { config } from '$lib/Shared/config';
import { profile, jwt } from '$lib/Shared/Stores/UserStore';
import { get } from 'svelte/store';

export const loadProfile = async () => {
	const token = get(jwt);
	if (token > '') {
		let data = null;
		let response = await fetch(`${config.apiBaseUrl}/users/me?fields=*&populate=*`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.ok) {
			data = await response.json();
			response = await fetch(`${config.apiBaseUrl}/chain-wallets/wallets`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (response.ok) {
				const wallets = await response.json();
				data.wallets = wallets.results;
			}
		}
		if (data) profile.set(data);
	}
};
