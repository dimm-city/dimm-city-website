import { derived, writable } from 'svelte/store';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';
import { config } from '$lib/Shared/config';
import { get } from 'svelte/store';

export const getItchIoLoginUrl = () => {
	const itchioUrl =
		'https://itch.io/user/oauth?' +
		'client_id=' +
		config.itchio.client_id +
		'&response_type=token&scope=' +
		encodeURIComponent('profile:me') +
		'&redirect_uri=' +
		encodeURIComponent(config.baseUrl + '/connect/redirect/itchio');
	return itchioUrl;
};

export const jwt = writable(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => {
	setSessionValue('jwt', value);
});

export const user = writable(getSessionValue('user') ?? null);
user.subscribe((value) => {
	setSessionValue('user', value);
});

/**
 * Loads the user profile asynchronously.
 *
 * @return {Promise<void>} - A promise that resolves when the profile is loaded.
 */
export async function loadProfile() {
	const token = get(jwt);
	const p = get(user);

	if (token && p.username == null) {
		let result = null;
		const response = await fetch(`${config.apiBaseUrl}/users/me?fields=*&populate=*`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.ok) {
			result = await response.json();
			console.log('profile loaded', result);
		}
		if (result) user.set(result);
	}
}

/**
 * @param {{ email: null; id: any; }} profile
 */
export async function updateProfile(profile) {
	const token = get(jwt);
	const userValue = get(user);

	if (token && profile?.email != null) {
		let result = null;
		const response = await fetch(`${config.apiBaseUrl}/dimm-city/profiles/${profile.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ data: profile })
		});
		if (response.ok) {
			result = await response.json();
			console.log('profile updated', result);
		}
		if (result) {
			user.set({
				...userValue,
				profile: {
					id: result.data.id,
					...result.data.attributes
				}
			});
		}
	}
}

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
 * @param {CW.Token } token
 */
export function ownsToken(token) {
	//return true;
	const userWallets = get(wallets) ?? [];
	console.log('checking ownership of token', token);
	const id = (token?.id || token?.data?.id || token || -1).toString();
	const result =
		id != '-1' &&
		Array.isArray(userWallets) &&
		userWallets?.some((w) =>
			w.tokens?.some((t) => t.id.toString() === id || t.tokenId === token?.toString())
		);

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
