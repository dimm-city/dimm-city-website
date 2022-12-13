<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { config } from '$lib/Shared/config';

	const token = $page.url.searchParams.get('access_token');
	console.log(token);

	fetch(config.apiBaseUrl + '/auth/reddit/callback?access_token=' + token).then(async (callback) => {
		const cbData = await callback.json();
		console.log(cbData);

		fetch(config.apiBaseUrl + '/users/me?fields=id&populate[wallets][populate]=*&populate[settings][populate]=*', {
			headers: {
				Authorization: `Bearer ${cbData.jwt}`
			}
		}).then(async (data) => {
			console.log(await data.json());

			
		});
	});
</script>
