
// import { config } from '$lib/Shared/config';
// import { profile } from '$lib/Shared/Stores/UserStore';
// import { error } from '@sveltejs/kit';

// export async function load({ params }): any {

// 	console.log('loading redirect', params);

// 	if (params.access_token > '') {
// 		const token = params.access_token;

// 		const callback = await fetch(config.apiBaseUrl + '/auth/reddit/callback?access_token=' + token);

// 		console.log('parsing token');

// 		const cbData = callback.json();
// 		console.log('setting jwt', cbData);

// 		return cbData;
// 	}

// 	//throw error(404, 'Not found');
// }

export const prerender = false;
export const ssr = false;
export const csr = true;
