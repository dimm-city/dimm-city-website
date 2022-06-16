import { writable } from 'svelte/store';
import type { ISummaryItem } from './Characters/Character';
import { getLocalValue, getSessionValue, setLocalValue, setSessionValue } from './StoreUtils';

export const menuItems = writable([]);
export const showMenu = writable(true);

export const myCollection = writable(getSessionValue('collection') ?? []);
myCollection.subscribe((value) => setSessionValue('collection', value));

export const specialties = writable(getSessionValue('specialties') ?? []);
specialties.subscribe((value) => setSessionValue('specialties', value));

export const characters = writable(getLocalValue('characters') ?? []);
characters.subscribe((value) => setLocalValue('characters', value, getExpiryTime()));

export const districts = writable<ISummaryItem[]>(getLocalValue('districts') ?? []);
districts.subscribe((value) => setLocalValue('districts', value, getExpiryTime()));
function getExpiryTime(): number {
    return new Date(new Date().getTime() + 60 * 1000).getTime();
}


export const pageImage = writable("https://files.dimm.city/stories/intro/index.png");