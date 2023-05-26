<script lang="ts">
	import { page } from '$app/stores';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import { config } from '$lib/Shared/config';
	import { jwt, profile } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';
	const token =  $page.url.searchParams.get('access_token');
	const redirect =  $page.url.searchParams.get('redirect');

	onMount(async () => {
		const callback = await fetch(config.apiBaseUrl + '/auth/reddit/callback?access_token=' + token);
		
		const cbData = await callback.json();
		$jwt = cbData.jwt;

		$profile = { ...cbData };
		if (document) {
			document.location = redirect ?? '/console';
		}
	});
</script> 
<!-- 
<Shell title="Loading profile...">
	<ContentPane>
		<LoadingIndicator>Loading profile...</LoadingIndicator>
	</ContentPane>
</Shell> -->
