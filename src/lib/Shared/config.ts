import { config as prod } from './config.prod';
import { config as staging } from './config.staging';
import { config as dev } from './config.dev';
import { browser } from '$app/env';

export const config = getCurrentConfig();

function getCurrentConfig() {
	let output = dev;
	if (!browser && process && process.env && process.env.NODE_ENV === 'production') output = prod;
	if (browser && window.location.href.includes(prod.baseUrl)) output = prod;
	if (browser && window.location.href.includes(staging.baseUrl)) output = staging;
	if (browser && window.location.href.includes(dev.baseUrl)) output = dev;

	output.version = '0.4.0';
	return output;
}