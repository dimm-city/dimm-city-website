import { config as prod } from './config.prod';
import { config as staging } from './config.staging';
import { config as dev } from './config.dev';
import { browser } from '$app/env';

export const config = getCurrentConfig(); 

function getCurrentConfig() {
	if (!browser && process && process.env && process.env.NODE_ENV === 'production') return prod;
	if (browser && window.location.href.includes(prod.baseUrl)) return prod;
	if (browser && window.location.href.includes(staging.baseUrl)) return staging;
	if (browser && window.location.href.includes(dev.baseUrl)) return dev;
	return dev;
}
