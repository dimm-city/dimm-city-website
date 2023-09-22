<script>
	import { getSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { page } from '$app/stores';
	import { config } from '$lib/Shared/config';
	import { jwt, loadProfile, loadWallets, user } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';
	const token = $page.url.searchParams.get('access_token');
	const provider = $page.params.provider;

	let redirect = { href: $page.url.searchParams.get('redirect') };

	onMount(async () => {
		const callback = await fetch(
			config.apiBaseUrl + '/auth/' + provider + '/callback?access_token=' + token
		);

		const cbData = await callback.json();
		$jwt = cbData.jwt;
		$user = { ...cbData };
		if (document) {
			await loadProfile();
			await loadWallets(true);
			redirect = getSessionValue('redirect');
			document.location = redirect?.href ?? '/';
		}
	});
</script>