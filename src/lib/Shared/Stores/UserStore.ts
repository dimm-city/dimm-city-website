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

export const jwt = writable<string | null>(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => {
	setSessionValue('jwt', value);
});

export const profile = writable<any>(getSessionValue('profile') ?? null);
profile.subscribe((value) => {
	setSessionValue('profile', value);
});

export const wallets = writable<any[]>(getSessionValue('wallets') ?? null);
wallets.subscribe((value) => {
	setSessionValue('wallets', value);
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

		for (let index = 0; index < data.results?.length; index++) {
			const wallet = data.results[index];

			for (const token of wallet.tokens) {
				const metaResponse = await fetch(
					`${config.apiBaseUrl}/chain-wallets/metadata/${token.contract.slug}/${token.tokenId}`
				);
				if (metaResponse.ok) token.metadata = await metaResponse.json();
			}
		}

		wallets.set(data.results ?? []);
		return data.results ?? [];
	} else {
		return [];
	}
}

export const tokens = derived<any[], any[]>([wallets], ($wallets) =>
	$wallets.flatMap((w: any) => w.tokens)
);

export const logout = () => {
	jwt.set(null);
	profile.set(null);

	setSessionValue('wallets', []);
};
