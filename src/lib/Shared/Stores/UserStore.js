import { derived, readable, writable } from 'svelte/store';
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

/**
 * The JWT for the logged in user.
 * {@type {import('svelte/store').Writable<string>}}
 */
export const jwt = writable(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => {
	setSessionValue('jwt', value);
});

/**
 * The profile for the logged in user.
 * {@type {import('svelte/store').Writable<DC.Profile>}}
 */
export const profile = writable(getSessionValue('profile') ?? null);
profile.subscribe((value) => {
	setSessionValue('profile', value);
});

/**
 * The logged in user.
 * {@type {import('svelte/store').Writable<DC.User>}}
 */
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
	const token = getSessionValue('jwt');
	if (token) {
		let result = null;
		const response = await fetch(`${config.apiBaseUrl}/users/me/profile`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.ok && response.status === 200) {
			result = await response.json();
			console.log('profile loaded', result);
			if (result) profile.set(result);
		}
	}
}
/**
 * Begins flow to associate a login with the profile.
 * @param {string | Location} providerUrl
 */
export function requestAssociateLogin(providerUrl) {
	setSessionValue('ap', true);
	document.location = providerUrl;
}

/**
 * @param {string} primaryToken
 * @param {string} secondaryToken
 */
async function associateLogin(primaryToken, secondaryToken) {
	const response = await fetch(config.apiBaseUrl + '/profiles/associate-login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + primaryToken
		},
		body: JSON.stringify({
			secondary_token: secondaryToken
		})
	});
	if (response.ok) {
		setSessionValue('ap', false);
		const data = await response.json();
		console.log('associated profile', data);
		profile.set(data.profile);
		document.location = '/profile';
	} else {
		console.warn('failed to associate profile');
	}
}

/**
 *
 * @param {string} provider
 */
export async function removeLogin(provider) {
	// @ts-ignore
	const _profile = getSessionValue('user');
	// @ts-ignore
	const jwt = getSessionValue('jwt');

	const id = _profile?.users?.find(
		(/** @type {{ provider: string; }} */ u) => u.provider === provider
	)?.id;
	const response = await fetch(config.apiBaseUrl + '/profiles/remove-login/' + id, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + jwt
		}
	});

	if (response.ok) {
		const data = await response.json();
		console.log('removed login', data);
		profile.set(data.profile);
	}
}
/**
 * @param {{ email: null; id: any; }} data
 */
export async function updateProfile(data) {
	const token = get(jwt);

	if (token && data?.email != null) {
		const response = await fetch(`${config.apiBaseUrl}/profiles/${data.id}?populate=*`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ data: data })
		});
		if (response.ok) {
			await loadProfile();			
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
 * @param {CW.Token | string } token
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

export const providers = readable([], (set) => {
	fetch(`${config.apiBaseUrl}/auth/providers`).then(async (response) => {
		if (response.ok) {
			const data = await response.json();
			set(data);
			setSessionValue('providers', data);
		}
	});
});

/**
 * Loads the wallets from the server.
 *
 * @return {Promise<Array<CW.Wallet>>} An array of wallets.
 */
export async function loadWallets() {
	console.debug('updating wallets from server');
	const _token = getSessionValue('jwt');
	const response = await fetch(`${config.apiBaseUrl}/chain-wallets/wallets?force=1&populate=*`, {
		headers: {
			Authorization: `Bearer ${_token}`
		}
	});
	if (response.ok) {
		const data = await response.json();
		wallets.set(data?.results ?? []);
		//setSessionValue('wallets', data ?? []);
		return data.results ?? [];
	} else {
		return [];
	}
}

/**
 * Handles the OAuth callback while logging in.
 * @param {string | null} redirect
 * @param {string} provider
 * @param {string | null} token
 */
export async function handleOAuthCallback(provider, token, redirect) {
	console.debug('handling oauth callback', provider, token, redirect);

	const callback = await fetch(
		config.apiBaseUrl + '/auth/' + provider + '/callback?access_token=' + token
	);

	if (callback.ok && document) {
		const data = await callback.json();
		const _jwt = getSessionValue('jwt');
		const _user = getSessionValue('user');

		const isAssociatingProfile = getSessionValue('ap');

		if (isAssociatingProfile === true && _jwt && _user) {
			await associateLogin(_jwt, data.jwt);
		} else {
			//Logging in
			await login(data, redirect);
		}
	} else {
		console.warn('failed to complete authentication', callback.statusText, await callback.text());
	}
}

export const logout = () => {
	jwt.set(null);
	user.set(null);
	profile.set(null);
	wallets.set(null);
};

/**
 * Logs in the user with the provided data and redirects to the specified URL.
 *
 * @param {{ jwt: string; user: any; }} data - The login data.
 * @param {string | null} redirect - The URL to redirect to after successful login (optional).
 * @return {Promise<void>} - A promise that resolves once the login process is complete.
 */
async function login(data, redirect) {
	console.log('Logged in', data);
	setSessionValue('ap', false);
	jwt.set(data.jwt);
	user.set(data.user);
	await loadProfile();
	await loadWallets();
	document.location = redirect ?? '/';
}
