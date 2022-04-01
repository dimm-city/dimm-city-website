import { writable } from 'svelte/store';
import type { ISummaryItem } from './Characters/Character';
import { getLocalValue, getSessionValue, setLocalValue, setSessionValue } from './StoreUtils';

export const menuItems = writable([]);
export const showMenu = writable(true);

export const myCollection = writable(getSessionValue('collection') ?? []);
myCollection.subscribe((value) => setSessionValue('collection', value));

export const roles = writable(getSessionValue('roles') ?? []);
roles.subscribe((value) => setSessionValue('roles', value));

export const characters = writable(getLocalValue('characters') ?? []);
characters.subscribe((value) => setLocalValue('characters', value, new Date(new Date().getTime() + 1 * 60000)));

export const districts = writable<ISummaryItem[]>(getLocalValue('districts') ?? []);
districts.subscribe((value) => setLocalValue('districts', value, new Date(new Date().getTime() + 1 * 60000)));
