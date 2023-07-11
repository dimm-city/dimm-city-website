<script>
	import { onMount } from 'svelte';
	import { profile, loadProfile, logout, loadWallets, tokens } from '$lib/Shared/Stores/UserStore';
	import CharacterMenu from '$lib/Characters/CharacterMenu.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';

	/**
	 * @type {Promise<any>}
	 */
	let walletQuery;
	onMount(async () => {
		await loadProfile();
		walletQuery = loadWallets();
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
	<a href="/console/archive"><small>manage archives</small></a>
</div>

<h3>Your Sporos</h3>
{#await walletQuery}
	<LoadingIndicator>Locating sporos...</LoadingIndicator>
{:then data}
	{#if $tokens?.length > 0}
		<CharacterMenu ownedCharactersOnly={true} />
	{:else}
		<p>No sporos located</p>
	{/if}
{/await}

<style>
	.header {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	h1 {
		display: block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 0.25rem;
	}
	small {
		font-size: 0.8rem;
		cursor: pointer;
	}
	.menu {
		margin-bottom: 1rem;
	}
</style>
