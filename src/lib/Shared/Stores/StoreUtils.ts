import { browser } from '$app/environment';

export function getExpiryTime(): number {
	return new Date(new Date().getTime() + 60 * 1000).getTime();
}
export function getSessionValue(key: string) {
	if (browser && sessionStorage) {
		const value = JSON.parse(sessionStorage.getItem(key) ?? "{}");
		return value;
	}
	return null;
}
export function setSessionValue(key: string, data: any) {
	if (data !== undefined && browser && sessionStorage) {
		console.debug('updating session', key, data);
		sessionStorage.setItem(key, JSON.stringify(data));
	}
}

export function getLocalValue(key: string) {
	if (browser && localStorage) {
		const value = JSON.parse(localStorage.getItem(key) ?? "{}");
		if (value && value.expires != null && value.expires < new Date().getTime()) {
			console.warn('Expired data...', key);

			localStorage.removeItem(key);
			return null;
		}
		console.log('found data in cache', key);

		return value ? value.data : null;
	}
	return null;
}

export function setLocalValue(key: string, data: any, expires: number) {
	if (data !== undefined && browser && localStorage) {
		if (expires) localStorage.setItem(key, JSON.stringify({ expires, data }));
		else localStorage.setItem(key, JSON.stringify(data));
	}
}

export const filterAndSort = (items: any[], text: string) => {
	return sortByName(items.filter((c: { name: string; }) => c.name?.toLowerCase().indexOf(text?.toLowerCase()) > -1));
};

const sortByName = (items: any[]) => {
	return items.sort((a: { name: { toLowerCase: () => number; }; }, b: { name: { toLowerCase: () => number; }; }) => {
		if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		else return -1;
	});
};
