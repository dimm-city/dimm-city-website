import { writable } from 'svelte/store';
import type { ISummaryItem } from '$lib/Shared/Models/ISummaryItem';
import { getExpiryTime, getLocalValue,  setLocalValue } from '$lib/Shared/Stores/StoreUtils';

export const districts = writable<ISummaryItem[]>(getLocalValue('districts') ?? []);
districts.subscribe((value) => setLocalValue('districts', value, getExpiryTime()));
