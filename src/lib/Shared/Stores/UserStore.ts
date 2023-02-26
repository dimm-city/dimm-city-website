import { derived, writable } from 'svelte/store';
import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';

export const jwt = writable<string>(getSessionValue('jwt') ?? null);
jwt.subscribe((value) => {
	if (value > '') {
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
	[jwt, profile],
	([$jwt, $profile], set) => {
		const isLoggedIn = $jwt != null && $profile?.id != null;
		console.log('updating logged in', $jwt, $profile, isLoggedIn);
		set(isLoggedIn);
	},
	false
);
