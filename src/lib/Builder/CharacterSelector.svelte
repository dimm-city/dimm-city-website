<script>
	import CharacterCard from '$lib/Builder/CharacterCard.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { jwt } from '$lib/Shared/Stores/UserStore';
	import { getCharactersByUser } from '$lib/Shared/Stores/getCharacters';
	import { StrapiClient } from '$lib/Shared/StrapiClient';
	import { config } from '$lib/Shared/config';
	import { onMount } from 'svelte';

	const client = new StrapiClient(config.apiBaseUrl, $jwt);

	/**
	 * @type {any[]}
	 */
	let availableCharacters = [];

	/**
	 * @type {DC.Character}
	 */
	export let selectedCharacter;

	onMount(async () => {
		loadAvailableCharacters();
	});
	async function loadAvailableCharacters() {
		const results = await getCharactersByUser($jwt);
		if (results.data?.length > 0) {
			availableCharacters = [...results.data];		
		}
	}

	/**
	 * @param {any} tokenId
	 * @param {MouseEvent} e
	 */
	export async function loadCharacter(tokenId, e) {
		console.log('loadCharacter', tokenId);
		const data = await client.loadBySlug('dimm-city/characters', tokenId, {
			filters: {
				tokenId: tokenId
			},
			populate: {
				mainImage: true,
				originalLocation: true,
				currentLocation: true,
				specialties: {
					populate: {
						skillTrees: true
					}
				}
			}
		});

		selectedCharacter = {
			...data
		};

		//e.target?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<ContentPane padding={3} scrollable={true}>
	<div class="select">
		<h1>Select your Sporo</h1>
		<div class="characters">
			{#each availableCharacters as c}
				<div class="character-card-container" class:selected={c.id === selectedCharacter?.id}>
					<CharacterCard
						character={c}
						on:click={(e) => loadCharacter(c.attributes.tokenId, e)}
						on:edit
						on:view
						on:print
						selected={c.id === selectedCharacter?.id}
					/>
				</div>
			{/each}
		</div>
	</div>
</ContentPane>

<style>
	:root {
		--dc-character-card-transition: bottom 0.2s ease-in-out, opacity 0.1s ease-in-out;
	}
	h1 {
		text-align: center;
		margin: 0;
		margin-bottom: 2rem;
	}

	.select .characters {
		display: grid;
		width: 100%;
		gap: 2rem;
		margin-inline: auto;
		--dc-menu-item-aspect-ratio: auto;
		grid-template-columns: repeat(auto-fill, minmax(150px, 300px));
		justify-content: center;
	}
	:global(.select .characters .menu-item-container) {
		margin: auto;
	}

	.character-card-container {
		position: relative;
        width: fit-content;
        margin: auto;
	}
	.character-card-container::before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	}
	.character-card-container.selected::before {
		box-shadow: var(--dc-menu-item-selected-drop-shadow);
		transition: all 0.1s ease-in-out;
	}

	@media (max-width: 800px) {
		.select .characters {
			grid-template-columns: 1fr;
		}
	}
</style>
