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

export const jwt = writable(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => {
	setSessionValue('jwt', value);
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
		const response = await fetch(`${config.apiBaseUrl}/profiles/me?fields=*&populate=*`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.ok && response.status === 200) {
			result = await response.json();
			console.log('profile loaded', result);
			if (result) setSessionValue('user', result);
		}
	}
}
/**
 * @param {string | Location} providerUrl
 */
export function associateLogin(providerUrl) {
	setSessionValue('ap', true);
	document.location = providerUrl;
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
		//setSessionValue('user', data.profile);
		if (user) user.set(data.profile);
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
		const response = await fetch(`${config.apiBaseUrl}/profiles/${profile.id}`, {
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

export const providers = readable([], (set) => {
	fetch(`${config.apiBaseUrl}/auth/providers`).then(async (response) => {
		if (response.ok) {
			const data = await response.json();
			set(data);
			setSessionValue('providers', data);
		}
	});
});

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

/**
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
		
		const cbData = await callback.json();
		const _token = getSessionValue('jwt');
		const _profile = getSessionValue('user');
		
		const isAssociatingProfile = getSessionValue('ap');

		if (isAssociatingProfile === true && _token && _profile) {
			const secondary_token = cbData.jwt;
			const secondary_response = await fetch(config.apiBaseUrl + '/profiles/associate-login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + _token
				},
				body: JSON.stringify({
					secondary_token
				})
			});
			if (secondary_response.ok) {
				setSessionValue('ap', false);
				const data = await secondary_response.json();
				console.log('associated profile', data);
				setSessionValue('user', data.profile);

				//await loadProfile();
				document.location = '/profile';
			} else {
				console.warn('failed to associate profile');
			}
		} else {
			//Logging in
			setSessionValue('ap', false);
			setSessionValue('jwt', cbData.jwt);
			setSessionValue('user', cbData.user);
			await loadProfile();
			await loadWallets(true);
			document.location = redirect ?? '/';
		}
	} else {
		console.warn('failed to complete authentication', callback.statusText, await callback.text());
	}
}

export const logout = () => {
	jwt.set(null);
	user.set(null);

	setSessionValue('wallets', []);
};
