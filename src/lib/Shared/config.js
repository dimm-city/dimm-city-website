import { config as prod } from './Config/config.prod';
import { config as staging } from './Config/config.staging';
import { config as beta } from './Config/config.beta';
import { config as dev } from './Config/config.dev';
import { browser } from '$app/environment';

/** @type {DC.Config} */
export const config = getCurrentConfig();

function getCurrentConfig() {
	/** @type {DC.Config} */
	let output = {
		...dev,
		version: '0.10.0',
		defaultSummaryQuery: {
			sort: ['name:asc'],
			populate: 'mainImage',
			fields: ['name', 'slug', 'shortDescription'],
			pagination: {
				pageSize: 20,
				page: 1
			},
			publicationState: 'live',
			locale: ['en'],
			storageBaseUrl: 'http://localhost:1337',
			itchio: {
				client_id: '2fa887a30a2e8a840e45ea321f5d296f'
			}
		}
	};

	if (browser) {
		console.log('Loading client config:', window.location.href);
		if (window.location.href.includes(prod.baseUrl)) output = prod;
		else if (window.location.href.includes(staging.baseUrl)) output = staging;
		else if (window.location.href.includes(beta.baseUrl)) output = beta;
		else if (window.location.href.includes(dev.baseUrl)) output = dev;
	} else if (process) {
		console.log('Loading server config', process.env.BUILD_ENV, process.env.NODE_ENV);
		if (process.env) {
			if (process.env.BUILD_ENV === 'production' && process.env.NODE_ENV === 'production')
				output = prod;
			else if (process.env.BUILD_ENV === 'staging' || process.env.NODE_ENV === 'staging')
				output = staging;
			else if (process.env.BUILD_ENV === 'beta' || process.env.NODE_ENV === 'beta') output = beta;
			else if (process.env.BUILD_ENV === 'development' || process.env.NODE_ENV === 'development')
				output = dev;
		}
	}

	if (output.googleKey <= '') {
		output.googleKey = 'testing';
	}
	// output.stripePublicKey =
	// 	'pk_test_51MmHcALeft6siyywTseJIs5awwWr469e2D9RQMI5a79oz1NGhg8ijvPNH1NbgMrM2aIn4KadqswLuTF2kc4tZVNp00UQj2pA8Z';

	output.version = '0.9.0';
	console.log('config loaded', output);
	return output;
}
