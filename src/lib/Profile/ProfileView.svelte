<script>
	import { onMount } from 'svelte';
	import { profile, jwt, logout, loadWallets } from '$lib/Shared/Stores/UserStore';
	import PagedResults from '../Shared/Components/PagedResults.svelte';
	import MenuItem from '../Shared/Components/Menu/MenuItem.svelte';
	import CharacterMenuItem from '$lib/Characters/CharacterMenuItem.svelte';
	import { config } from '$lib/Shared/config';

	let currentPage = 1;
	let totalPages = 1;

	
	/**
	 * @type {Strapi.APIResponse<DC.Character[]>}
	 */
	onMount(async () => {

		/**@type {CW.Wallet[]}*/
		const wallets = await loadWallets();		
	});
</script>

<div class="header">
	<h1>{$profile?.displayName}</h1>
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- <p>{@html $profile?.settings?.bio ?? ''}</p> -->
</div>
<div class="profile-menu">
	<!-- <a href="/console/characters/create">create character</a> -->
	<!-- <a href="/console/archive"><small>manage archives</small></a> -->
	<button class="text-button" on:click={logout}>logout</button>
</div>

<h3>Your Sporos</h3>
<PagedResults
	bind:page={currentPage}
	bind:totalPages
	autoLoad={true}	
	endpoint={`${config.apiBaseUrl}/dimm-city/my/characters`}	
	jwt={$jwt}
>
	<svelte:fragment slot="result" let:result>
		<slot name="result" {result}>
			<MenuItem url={`/citizens/${result.attributes.tokenId}`}>
				<CharacterMenuItem {result} />
			</MenuItem>
		</slot>
	</svelte:fragment>
</PagedResults>

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
	.profile-menu {
		display: flex;
		justify-content: space-between;
		margin-block: 1rem;
		border-bottom: 1px solid var(--secondary-accent);
	}
</style>
