import { derived, writable } from 'svelte/store';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';

export const jwt = writable<string>(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => setSessionValue('jwt', value));

export const profile = writable<any>(getSessionValue('profile') ?? null);
profile.subscribe((value) => setSessionValue('profile', value));

export const loggedIn = derived(
	[jwt, profile],
	([$jwt, $profile], set) => {
		const isLoggedIn = $jwt != null && $profile != null;
		console.log('updating logged in', $jwt, $profile, isLoggedIn);
		set(isLoggedIn);
	},
	false
);
