<script lang="ts">
	import { onMount } from 'svelte';
	import { profile, wallets, loadProfile } from '$lib/Shared/Stores/UserStore';

	onMount(async () => {
		await loadProfile();
	});
</script>

<div>
	<h1>{$profile?.settings?.displayName ?? $profile?.username}</h1>
	<small><a href="/console/archive">archives: {$wallets?.length ?? '0'}</a> </small>
	<p>{@html $profile?.settings?.bio ?? ''}</p>
</div>

<style>
	h1 {
		margin-bottom: 0;
	}
</style>
