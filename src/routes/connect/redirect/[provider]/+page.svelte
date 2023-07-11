<script lang="ts">
	import { getSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { page } from '$app/stores';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { config } from '$lib/Shared/config';
	import { jwt, profile } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';
	const token = $page.url.searchParams.get('access_token');
	const provider = $page.params.provider;
	let redirect = $page.url.searchParams.get('redirect');

	onMount(async () => {
		const callback = await fetch(
			config.apiBaseUrl + '/auth/' + provider + '/callback?access_token=' + token
		);

		const cbData = await callback.json();
		$jwt = cbData.jwt;

		$profile = { ...cbData };
		if (document) {
			redirect = getSessionValue('redirect');
			document.location = redirect.href ?? '/console';
		}
	});
</script>

<!-- 
<Shell title="Loading profile...">
	<ContentPane>
		<LoadingIndicator>Loading profile...</LoadingIndicator>
	</ContentPane>
</Shell> -->
