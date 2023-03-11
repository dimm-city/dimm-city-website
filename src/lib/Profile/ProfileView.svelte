<script lang="ts">
	import { onMount } from 'svelte';
	import { profile, wallets, loadProfile } from '$lib/Shared/Stores/UserStore';
	import WalletsView from '$lib/Wallets/WalletsView.svelte';

	onMount(async () => {
		await loadProfile();
	});
</script>

<div>
	<h1>{$profile?.settings?.displayName ?? $profile?.username}</h1>
	<!-- <p>{@html $profile?.settings?.bio ?? ''}</p> -->

	<WalletsView />
</div>

