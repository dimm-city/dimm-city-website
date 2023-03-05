<script lang="ts">
	import { page } from '$app/stores';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import { config } from '$lib/Shared/config';
	import { jwt, profile } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';
	const token = $page.url.searchParams.get('access_token');
	
	onMount(async () => {
		// if ($jwt && $profile) {
		// 	document.location = '/console';
		// }

		console.log('getting jwt');

		const callback = await fetch(config.apiBaseUrl + '/auth/reddit/callback?access_token=' + token);
		console.log('parsing token');

		const cbData = await callback.json();
		console.log('setting jwt', cbData);
		console.debug(cbData);
		$jwt = cbData.jwt;
		// // const data = await fetch(
		// // 	config.apiBaseUrl +
		// // 		'/users/me?fields=id&populate[wallets][populate]=*&populate[settings][populate]=*',
		// // 	{
		// // 		headers: {
		// // 			Authorization: `Bearer ${$jwt}`
		// // 		}
		// // 	}
		// // );
		// // const json = await data.json();
		console.log('setting profile');

		$profile = { ...cbData };
		if (document) {
			document.location = '/console';
		}
	});
</script>

<Shell title="Loading profile...">
	<ContentPane>
		<LoadingIndicator>Loading profile...</LoadingIndicator>
	</ContentPane>
</Shell>
