<script>
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import { characters } from '$lib/ShellStore';
	import { createEventDispatcher, onMount } from 'svelte';
	import { getCharactersQuery } from '../../queries/getCharacters';
	import { config } from '../../config';

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
	function selectCharacter(character) {
		dispatcher('character.selected', character.tokenId);
	}
</script>

<style>
	.toolbar {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
	.toolbar a,
	.toolbar a:visited {
		color: var(--third-accent);
		transition: color 500ms ease-in-out;
	}
	.toolbar a:hover,
	.toolbar a:active {
		color: var(--primary-accent);
		transition: color 500ms ease-in-out;
	}

	.item-container{
		margin-bottom: 5em;
		width: 100%;
	}
</style>

{#await query}
	<LoadingIndicator>
		<div>Locating citizen data...</div>
	</LoadingIndicator>
{:then}
	{#if $characters != null}
		{#each $characters as character}
			<MenuItem url="/citizens/{character.tokenId}" on:click={() => selectCharacter(character)}>
				<p><i class="bi bi-person text-light" />{character.name}</p>
				<small>
					{#if character.race.data.attributes}
						<div>{character.race.data.attributes.name}</div>
					{:else}
						<div>Unknown race</div>
					{/if}
					{#if character.specialties && character.specialties.data}
						<div>
							{character.specialties.data.map((r) => r.attributes.name).join(', ')}
						</div>
					{:else}
						<div>Unknown specialties</div>
					{/if}
				</small>

				<div class="toolbar">
					<!-- <a
						target="_blank"
						on:click|stopPropagation={() => true}
						href="/citizens/print/{character.attributes.tokenId}"
					>
						<i class="bi bi-printer" />
					</a> -->
				</div>
			</MenuItem>
		{/each}
		<div class="item-container">&nbsp;</div>
	{/if}
{:catch e}
	<div>{e}</div>
{/await}
