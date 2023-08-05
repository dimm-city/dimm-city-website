import { derived, writable } from 'svelte/store';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';
import { config } from '$lib/Shared/config';
import { get } from 'svelte/store';

export async function loadProfile() {
	const token = get(jwt);
	const p = get(user);
	
	if (token && p.username == null) {
		let data = null;
		const response = await fetch(`${config.apiBaseUrl}/users/me?fields=*&populate=*`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.ok) {
			
			data = await response.json();
			console.log('profile', data);
		}
		if (data) user.set(data);
	}
}

export const jwt = writable(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => {
	setSessionValue('jwt', value);
});

export const user = writable(getSessionValue('profile') ?? null);
user.subscribe((value) => {
	setSessionValue('profile', value);
});

/** @type {import('svelte/store').Writable<CW.Wallet[]>} */
export const wallets = writable(getSessionValue('wallets') ?? null);
wallets.subscribe((value) => {
	setSessionValue('wallets', value);
});

export const loggedIn = derived(
	[jwt],
	([$jwt], set) => {
		const isLoggedIn = typeof $jwt === 'string' && $jwt > '';
		set(isLoggedIn);
	},
	false
);

/**
 * @param {CW.Token | string} token
 */
export function ownsToken(token){
	//return true;
	const userWallets = get(wallets) ?? [];
	console.log('checking ownership of token', token);
	const id =  (token?.id || token?.data?.id || token || -1).toString();
	const result =
		id != '-1' &&
		Array.isArray(userWallets) &&
		userWallets?.some((w) => w.tokens?.some((t) => t.id.toString() === id || t.slug === token));

	return result;
}

export async function loadWallets(force = false) {
	if (!force) {
		const wallets = getSessionValue('wallets');
		if (wallets.length > 0) return wallets;
	}
	console.log('updating wallets from server');
	const token = get(jwt);
	const response = await fetch(`${config.apiBaseUrl}/chain-wallets/wallets?populate=*`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (response.ok) {
		const data = await response.json();
		wallets.set(data.results ?? []);
		return data.results ?? [];
	} else {
		return [];
	}
}

export const logout = () => {
	jwt.set(null);
	user.set(null);

	setSessionValue('wallets', []);
};
