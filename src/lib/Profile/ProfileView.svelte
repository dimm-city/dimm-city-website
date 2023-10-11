<script>
	import { onMount } from 'svelte';
	import { user, logout, loadWallets, loadProfile } from '$lib/Shared/Stores/UserStore';
	import { getCharactersByIds, getCharactersByUser } from '$lib/Shared/Stores/getCharacters';
	import PagedResults from '../Shared/Components/PagedResults.svelte';
	import MenuItem from '../Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '../Shared/Components/DefaultItemResult.svelte';
	import { config } from '$lib/Shared/config';
	import { userOwnsTokenFilter } from '$lib/Shared/StrapiFilters';
	import CharacterMenuItem from '$lib/Characters/CharacterMenuItem.svelte';

	let currentPage = 1;
	let totalPages = 1;
	let query = {
		sort: ['name:asc'],
		fields: ['name', 'tokenId'],
		populate: ['race', 'specialty', 'currentLocation'],
		publicationState: 'live',
		filters: userOwnsTokenFilter($user.id)
	};

	/**
	 * @type {any}
	 */
	let initialData;
	onMount(async () => {

		/**@type {CW.Wallet[]}*/
		const wallets = await loadWallets();
		const tokenIds = wallets.flatMap(w => w.tokens).map(t => t.id);
		initialData = await getCharactersByIds(tokenIds, ['name', 'tokenId'], ['race', 'specialties', 'currentLocation', 'mainImage']);
	});
</script>

<div class="header">
	<h1>{$user?.profile?.displayName ?? $user?.username}</h1>
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
	results={initialData?.data}
	endpoint={`${config.apiBaseUrl}/dimm-city/characters`}
	{query}
	autoLoad={false}
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
