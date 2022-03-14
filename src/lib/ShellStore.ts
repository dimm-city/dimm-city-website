import { writable, derived } from 'svelte/store';
import { signerAddress, connected } from 'svelte-ethers-store';

export const menuItems = writable([]);
export const showMenu = writable(true);

export const loggedIn = derived(
	[connected, signerAddress],
	([$connected, $signerAddress], set) => set($connected && $signerAddress > ''),
	false
);

export const myCollection = writable([]);

export const characters = writable([]);