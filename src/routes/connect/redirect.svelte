<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { config } from '$lib/Shared/config';
	import { jwt, profile } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';
	const token = $page.url.searchParams.get('access_token');
	console.log(token);

	

	onMount(() => {
		if ($jwt && $profile) {
			document.location = '/console';
		}
		fetch(config.apiBaseUrl + '/auth/reddit/callback?access_token=' + token).then(async (callback) => {
		const cbData = await callback.json();
		console.log(cbData);
		$jwt = cbData.jwt;
		fetch(config.apiBaseUrl + '/users/me?fields=id&populate[wallets][populate]=*&populate[settings][populate]=*', {
			headers: {
				Authorization: `Bearer ${$jwt}`
			}
		}).then(async (data) => {
			const json = await data.json();
			$profile = json;
			if (document) {
				document.location = '/console';
		}
		});
	});
	});
</script>
