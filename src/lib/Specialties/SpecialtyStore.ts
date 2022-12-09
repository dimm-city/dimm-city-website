import { writable } from 'svelte/store';
import { getExpiryTime, getLocalValue, setLocalValue } from '$lib/Shared/Stores/StoreUtils';

export const specialties = writable(getLocalValue('specialties') ?? []);
specialties.subscribe((value) => setLocalValue('specialties', value, getExpiryTime()));
