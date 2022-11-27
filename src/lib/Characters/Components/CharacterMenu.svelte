<script lang="ts">
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import { characters, searchText, filterAndSort } from '$lib/Shared/Stores/ShellStore';
	import { createEventDispatcher, onMount } from 'svelte';
	import { getCharactersQuery } from '../Queries/getCharacters';
	import { config } from '$lib/Shared/config';
	import type { ICharacter } from '../Models/Character';

	const dispatcher = createEventDispatcher();
	
	function loadCharacters() {
		$characters = [];
		return fetch(config.graphUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: getCharactersQuery
			})
		})
			.then(async (response) => {
				if (response.ok) {
					const json = await response.json();

					return json.data.characters.data
						.map((c) => {
							let x = { ...c.attributes };
							x.id = c.id;
							return x;
						})
						.sort((a, b) => {
							if (a.name > b.name) return 1;
							else return -1;
						});
				}
				return {};
			})
			.catch((reason) => {
				console.log('loadCharacters failed', reason);
			});
	}

	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			// if ($characters?.length < 1 || !$searchText) {
				$characters = await loadCharacters();
				resolve($characters);
			//} else resolve($characters);
		});
	});
	
	$: filteredCharacters  = filterAndSort($characters, $searchText);

	function selectCharacter(e) {
		let character = e.detail;
		dispatcher('character.selected', character.tokenId);
		document.location = '/citizens/' + character.tokenId;
	}
</script>

<FlexMenu on:itemSelected={(e) => selectCharacter(e)} data={filteredCharacters} {query}>
	<svelte:fragment let:item slot="subtitle">
		{#if item.race?.data?.attributes}
			<div>{item.race.data.attributes.name}</div>
		{:else}
			<div>Unknown race</div>
		{/if}</svelte:fragment
	>
	<div slot="description" let:item>
		{#if item.specialties && item.specialties.data}
			<div>
				{item.specialties.data.map((r) => r.attributes.name).join(', ')}
			</div>
		{:else}
			<div>Unknown specialties</div>
		{/if}
	</div>
</FlexMenu>
