import { writable, derived } from 'svelte/store';
import { signerAddress, connected } from 'svelte-ethers-store';
import type { SvelteComponent } from 'svelte';

export const menuItems = writable([]);
export const showMenu = writable(true);

export const modalComponent = writable(null);
export const modalModel = writable(null);
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

export const showModalComponent = (component, model) => {
	modalComponent.set(component); // AbilityDetails;
	modalModel.set(model);
	showModal.set(true);
};
