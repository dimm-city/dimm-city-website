<script>
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { createEventDispatcher } from 'svelte';
	import { getCharactersQuery } from '../../queries/getCharacters';
	import { config } from '../config';

	const dispatcher = createEventDispatcher();

	function loadCharacters() {
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

					return json.data.characters.data;
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

	let query = loadCharacters();

	function selectCharacter(character) {
		dispatcher('character.selected', character.attributes.tokenId);
	}
</script>

{#await query}
	<div class="loading-indicator fade-in" data-augmented-ui>
		<div>Locating citizen data...</div>
	</div>
{:then characters}
	{#if characters != null}
		{#each characters as character}
			<MenuItem
				url="/citizens/{character.attributes.tokenId}"
				on:click={() => selectCharacter(character)}
			>
				<p><i class="bi bi-person text-light" />{character.attributes.name}</p>
				<small>
					<div>{character.attributes.race.data.attributes.name}</div>
					<div>
						{character.attributes.roles.data.map((r) => r.attributes.name).join(', ')}
					</div>
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
	{/if}
{:catch e}
	<div>{e}</div>
{/await}

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
</style>
