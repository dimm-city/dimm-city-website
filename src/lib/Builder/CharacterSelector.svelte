<script>
	import CharacterCard from '$lib/Builder/CharacterCard.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
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
		console.log('ac', results);
		if (results.data?.length > 0) {
			availableCharacters = [...results.data];
		}
	}
    	
	async function loadCharacter(tokenId) {
        console.log('loadCharacter', tokenId);
		selectedCharacter = await client.loadBySlug('dimm-city/characters', tokenId, {
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
 
	}
</script>

<ContentPane padding={3} scrollable={true}>
	<div class="select">
		<h1>Select your Sporo</h1>
		<div class="characters">
			{#each availableCharacters as c}
				<MenuItem on:click={() => loadCharacter(c.attributes.tokenId)} selected={c.id === selectedCharacter?.id}>
					<CharacterCard character={c} />
                    {#if c.id === selectedCharacter?.id}
                        <div class="panel">
                            <button class="aug-button">Edit</button>
                            <button class="aug-button">View</button>
                            <button class="aug-button">Print</button>
                        </div>
                    {/if}
				</MenuItem>
			{/each}
		</div>
	</div>
</ContentPane>

<style>
	h1 {
		text-align: center;
		margin: 0;
		margin-bottom: 2rem;
	}

	.select .characters {
		display: grid;
		width: 100%;
		row-gap: 1.5rem;
		margin-inline: auto;
		--dc-menu-item-aspect-ratio: 9/16;
		grid-template-columns: repeat(auto-fill, minmax(150px, 300px));
		justify-content: center;
	}
	:global(.select .characters .menu-item-container) {
		margin: auto;
	}
	.overview,
	.citizen {
		overflow-y: auto;
		padding-left: 3rem;

		color: var(--light);
	}
	.main-panel {
		padding-top: 1rem;
	}

	.dropdown-button {
		aspect-ratio: 1/1;
		/* background: var(--pink); */
		--aug-border-all: 1px;
		--aug-border-bg: var(--yellow);
		--aug-all-width: max(45px, 2vw);
		--aug-inlay-bg: var(--pink);
		transition: transform var(--easing);

		opacity: 1;
	}

	.aug-button:hover,
	.aug-button:focus {
		color: white;

		--aug-border-bg: var(--pink);
	}
	.aug-button:hover i,
	.aug-button:focus i {
		font-size: 1.25rem;
	}
	@media (max-width: 800px) {
		.select .characters {
			grid-template-columns: 1fr;
		}
		.overview,
		.citizen {
			padding-left: 0rem;
		}
	}
</style>
