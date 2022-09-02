<script>
	import FlexMenu from '$lib/Components/Menu/FlexMenu.svelte';
	import { characters } from '$lib/Shared/ShellStore';
	import { createEventDispatcher, onMount } from 'svelte';
	import { getCharactersQuery } from '../getCharacters';
	import { config } from '../../Shared/config';

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
					console.log('characters', json);

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
	// let query = new Promise((resolve) =>
	// 	setTimeout(async () => {
	// 		loadCharacters().then((d) => resolve(d));
	// 	}, 2000)
	// );
	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			if ($characters?.length < 1) {
				let data = await loadCharacters();
				$characters = data.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					else return -1;
				});
				resolve(data);
			} else resolve($characters);
		});
	});
	function selectCharacter(e) {
		let character = e.detail;
		dispatcher('character.selected', character.tokenId);
		document.location = '/citizens/' + character.tokenId;
	}
</script>

<FlexMenu on:itemSelected={e => selectCharacter(e)} data={$characters} {query}>
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
