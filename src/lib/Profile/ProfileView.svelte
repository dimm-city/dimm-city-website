<script lang="ts">
	import { onMount } from 'svelte';
	import { profile, loadProfile, logout } from '$lib/Shared/Stores/UserStore';
	import WalletsView from '$lib/Wallets/WalletsView.svelte';

	onMount(async () => {
		await loadProfile();
	});
</script>

<div class="header">
	<h1>{$profile?.settings?.displayName ?? $profile?.username}</h1>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a on:click={logout} on:keyup={logout}><small>logout</small></a>
	<!-- <p>{@html $profile?.settings?.bio ?? ''}</p> -->
</div>
<div class="menu">
	<a href="/console/characters/create"><small>create character</small></a>
</div>
<WalletsView />

<style>
	.header {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	h1{
		display: block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	small {
		font-size: 0.8rem;
		cursor: pointer;
	}
</style>
