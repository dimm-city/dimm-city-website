import { writable, derived } from 'svelte/store';
import { signerAddress, connected } from 'svelte-ethers-store';

export const menuItems = writable([]);
export const showMenu = writable(true);

export const modalComponent = writable(null);
//export const showModal = derived(modalComponent, ($comp) => $comp != null);
export const showModal = writable(false);
export const showModalFullscreen = writable(false);

export const loggedIn = derived(
	[connected, signerAddress],
	([$connected, $signerAddress], set) => set($connected && $signerAddress > ''),
	false
);

export const myCollection = writable([]);

export const characters = writable([]);