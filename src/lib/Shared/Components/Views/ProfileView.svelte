<script>
	import { onMount } from 'svelte';
	import { profile, logout } from '$lib/Shared/Stores/UserStore';
	import { getCharactersByUser } from '$lib/Shared/Stores/getCharacters';
	import PagedResults from '../PagedResults.svelte';
	import MenuItem from '../Menu/MenuItem.svelte';
	import DefaultItemResult from '../DefaultItemResult.svelte';
	import { config } from '$lib/Shared/config';

	let currentPage = 1;
	let totalPages = 1;
	let query = {
		sort: ['name:asc'],
		filters: {
			token: {
				wallet: {
					user: {
						id: $profile.id
					}
				}
			}
		},
		populate: '*'
	};

	/**
	 * @type {any}
	 */
	let initialData;
	onMount(async () => {
		initialData = await getCharactersByUser($profile.id);
	});
</script>

<div class="header">
	<h1>{$profile?.settings?.displayName ?? $profile?.user?.username}</h1>
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- <p>{@html $profile?.settings?.bio ?? ''}</p> -->
</div>
<div class="profile-menu">
	<a href="/console/characters/create">create character</a>
	<!-- <a href="/console/archive"><small>manage archives</small></a> -->
	<button class="text-button" on:click={logout}>logout</button>
</div>

<h3>Your Sporos</h3>
<PagedResults
	bind:page={currentPage}
	bind:totalPages
	results={initialData?.data}
	endpoint={`${config.apiBaseUrl}/dimm-city/characters`}
	{query}>
	<svelte:fragment slot="result" let:result>
		<slot name="result" {result}>
			<MenuItem url={`/characters/${result.attributes.slug}`}>
				<DefaultItemResult item={result.attributes} icon="bi-shield-lock" />
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
