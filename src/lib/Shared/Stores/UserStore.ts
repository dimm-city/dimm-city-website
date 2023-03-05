import { derived, writable } from 'svelte/store';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';
import { config } from '$lib/Shared/config';
import { get } from 'svelte/store';

export async function loadProfile() {
	const token = get(jwt);
	if (token > '') {
		let data = null;
		const response = await fetch(`${config.apiBaseUrl}/users/me?fields=*&populate=*`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.ok) {
			data = await response.json();
		}
		if (data) profile.set(data);
	}
}

export const jwt = writable<string>(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => {
	if (typeof value === 'string' && value > '') {
		setSessionValue('jwt', value);
		console.log('jwt set', value);
	}
});

export const profile = writable<any>(getSessionValue('profile') ?? null);
profile.subscribe((value) => {
	if (value?.id != null) {
		setSessionValue('profile', value);
		console.log('profile set', value);
	}
});

export const loggedIn = derived(
	[jwt],
	([$jwt], set) => {
		const isLoggedIn = typeof $jwt === 'string' && $jwt > '';
		console.log('updating logged in', $jwt, isLoggedIn);
		set(isLoggedIn);
	},
	false
);

export function ownsToken(token: any): boolean {
	const userWallets = get(wallets) ?? [];
	const id = (token?.id || token?.data?.id || -1).toString();
	const result =
		id != '-1' && userWallets.some((w) => w.tokens.some((t) => t.id.toString() === id));

	return result;
}

export async function loadWallets(force = false) {
	if (!force) {
		const wallets: any[] = getSessionValue('wallets');
		if (wallets.length > 0) return wallets;
	}
	const token = get(jwt);
	const response = await fetch(`${config.apiBaseUrl}/chain-wallets/wallets`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (response.ok) {
		const data = await response.json();
		setSessionValue('wallets', data.results ?? []);
		return data.results ?? [];
	} else {
		return [];
	}
}

// eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-unused-vars
export const wallets = derived<any, any[]>([profile], ([], set) => {
	loadWallets().then((data) => {
		set(data);
	});
});

export const tokens = derived<any[], any[]>([wallets], ($wallets) =>
	$wallets.flatMap((w: any) => w.tokens)
);
