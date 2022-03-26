import { writable, derived } from 'svelte/store';
import { signerAddress, connected } from 'svelte-ethers-store';
import { browser } from '$app/env';

export const menuItems = writable([]);
export const showMenu = writable(true);

export const loggedIn = derived(
	[connected, signerAddress],
	([$connected, $signerAddress], set) => set($connected && $signerAddress > ''),
	false
);

export const myCollection = writable(getSessionValue('collection') ?? []);
myCollection.subscribe((value) => setSessionValue('collection', value));

export const characters = writable(getLocalValue('characters') ?? []);
characters.subscribe((value) => setLocalValue('characters', value, new Date(new Date().getTime() + 1 * 60000)));

export const districts = writable(getLocalValue('districts') ?? []);
districts.subscribe((value) => setLocalValue('districts', value, new Date(new Date().getTime() + 1 * 60000)));

function getSessionValue(key: string) {
	if (browser && sessionStorage) {
		const value = JSON.parse(sessionStorage.getItem(key));
		return value;
	}
	return null;
}
function setSessionValue(key: string, data: any) {
	if (data !== undefined && browser && sessionStorage) {
		sessionStorage.setItem(key, JSON.stringify(data));
	}
}

function getLocalValue(key: string) {
	if (browser && localStorage) {
		const value = JSON.parse(localStorage.getItem(key));
		if (value && value.expires != null && value.expires < Date.now()) {
			localStorage.removeItem(key);
			return null;
		}
		return value ? value.data : null;
	}
	return null;
}

function setLocalValue(key: string, data: any, expires: Date) {
	if (data !== undefined && browser && localStorage) {
		if (expires) localStorage.setItem(key, JSON.stringify({ expires, data }));
		else localStorage.setItem(key, JSON.stringify(data));
	}
}
