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
		version: '0.9.0',
		defaultSummaryQuery:  {
		sort: ['name:asc'],
		populate: 'mainImage',
		fields: ['name', 'slug', 'shortDescription'],
		pagination: {
			pageSize: 20,
			page: 1
		},
		publicationState: 'live',
		locale: ['en']
	}
	};

	if (browser) {
		console.log('Loading client config');
		if (window.location.href.includes(prod.baseUrl)) output = prod;
		if (window.location.href.includes(staging.baseUrl)) output = staging;
		if (window.location.href.includes(beta.baseUrl)) output = beta;
		if (window.location.href.includes(dev.baseUrl)) output = dev;
	} else if (process) {
		console.log('Loading server config');
		if (process.env && process.env.NODE_ENV === 'production') output = prod;
		if (process.env && process.env.NODE_ENV === 'staging') output = staging;
		if (process.env && process.env.NODE_ENV === 'beta') output = beta;
		if (process.env && process.env.NODE_ENV === 'development') output = dev;
	}

	if (output.googleKey <= '') {
		output.googleKey = 'testing';
	}
	// output.stripePublicKey =
	// 	'pk_test_51MmHcALeft6siyywTseJIs5awwWr469e2D9RQMI5a79oz1NGhg8ijvPNH1NbgMrM2aIn4KadqswLuTF2kc4tZVNp00UQj2pA8Z';

	return output;
}