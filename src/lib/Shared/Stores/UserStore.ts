import { derived, writable } from 'svelte/store';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';

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

// export const wallets = derived<any[]>([profile], ([$profile], set) => {
// 	 getUserWallets().then( data => set(data));	
// });

export const loggedIn = derived(
	[jwt],
	([$jwt], set) => {
		const isLoggedIn = typeof $jwt === 'string' && $jwt > '';
		console.log('updating logged in', $jwt, isLoggedIn);
		set(isLoggedIn);
	},
	false
);
