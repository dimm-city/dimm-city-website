import { config as prod } from './Config/config.prod';
import { config as staging } from './Config/config.staging';
import { config as dev } from './Config/config.dev';
import { browser } from '$app/environment';

// import { readFileSync } from 'fs';
// import { fileURLToPath } from 'url';
// const file = fileURLToPath(new URL('../../../package.json', import.meta.url));
// const json = readFileSync(file, 'utf8');
// const pkg = JSON.parse(json);

export const config = getCurrentConfig();

function getCurrentConfig() {
	let output = dev;
	if (!browser && process && process.env && process.env.NODE_ENV === 'production') output = prod;
	if (browser && window.location.href.includes(prod.baseUrl)) output = prod;
	if (browser && window.location.href.includes(staging.baseUrl)) output = staging;
	if (browser && window.location.href.includes(dev.baseUrl)) output = dev;
	if (output.googleKey <= '') {
		output.googleKey = 'testing';
	}
	output.version = '0.8.0';
	output.stripePublicKey =
		'pk_test_51MmHcALeft6siyywTseJIs5awwWr469e2D9RQMI5a79oz1NGhg8ijvPNH1NbgMrM2aIn4KadqswLuTF2kc4tZVNp00UQj2pA8Z';
	return output;
}
