import { config as prod } from './config.prod';
import { config as dev } from './config.staging';
import { browser } from '$app/env';

//ToDo: add staging env
export const config = isProduction() ? prod : dev;

function isProduction() {
	if (!browser && process && process.env && process.env.NODE_ENV === 'production') return true;
	if (browser && window.location.href.includes(prod.baseUrl)) return true;
	return false;
}
