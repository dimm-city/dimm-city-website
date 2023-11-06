<script>
	import { page } from '$app/stores';
	import { handleOAuthCallback } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';

	const token =
		$page.url.searchParams.get('access_token') ??
		new URLSearchParams(window.location.hash.substring(1)).get('access_token');

	const provider = $page.params.provider;

	let redirect = { href: $page.url.searchParams.get('redirect') };

	onMount(async () => {
		handleOAuthCallback(provider, token, redirect.href);
	});
</script>
