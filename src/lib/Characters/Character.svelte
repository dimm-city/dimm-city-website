<script lang="ts">
	import { onMount } from 'svelte';
	import { loadCharacter } from '../queries/getCharacterBySlug';
	import { config } from '$lib/config';
	import { characters, myCollection, showMenu } from '$lib/ShellStore';
	import { openModal } from 'svelte-modals';
	import AbilityModal from './AbilityModal.svelte';
	import { Character } from './Character';
	import Image from '$lib/Components/Image.svelte';
	//	export let tokenId; // `dcs1r1-${id}`;
	export let character;

	// $: {
	// 	if (!tokenId || tokenId.length < 1) {
	// 		character = {};
	// 	} else {
	// 		query = loadCharacter(tokenId);
	// 		$showMenu = false;
	// 	}
	// }

	// let query = new Promise(() => {});

	// onMount(() => {
	// 	console.log('mount character', tokenId);

	// 	query = loadCharacter(tokenId);
	// });

	function selectAbility(ability: any) {
		openModal(AbilityModal, { data: ability });
	}
</script>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	.title-container {
		display: flex;
		justify-content: center;
		padding-bottom: 1rem;
	}
	.title-container div {
		display: block;
		text-align: center;
	}
	.title-container h1,
	.title-container h5 {
		display: block;
	}

	.container {
		display: grid;
		grid-template-columns: 0.5fr 0.5fr 0.2fr;
		grid-template-rows: 0.1fr 0.1fr 0.1fr min-content 0.8fr;
		gap: 1em;
		grid-auto-flow: row;
		align-content: start;
		grid-template-areas:
			'details details image'
			'details details image'
			'details details image'
			'capitial items items'
			'cybernetics abilities abilities'
			'cybernetics abilities abilities';
		width: 100%;
		height: 100%;
		margin-bottom: 5rem;
	}

	.container > .image {
		grid-area: image;
		height: max-content;
		display: flex;
		justify-content: center;
	}

	.details {
		grid-area: details;
		width: 100%;
		max-height: 100%;
		overflow-y: hidden;
	}
	.race {
		grid-area: race;
	}
	.specialties {
		grid-area: specialties;
		width: 100%;
	}

	.details > div {
		padding-bottom: 0.25rem;
		text-overflow: ellipsis;
	}
	.details div:nth-child(odd) {
		display: inline;
		font-weight: bold;
	}
	.details div:nth-child(even) {
		display: inline;
	}
	.details div:nth-child(even)::after {
		content: '';
		display: block;
	}
	.stats {
		display: flex;
		justify-content: space-between;
	}
	.stats > h4 {
		display: inline;
		font-size: 1.5rem;
	}
	.stats > h4:first-of-type {
		padding-right: 0.5rem;
	}

	.stats .points-block {
		/* border: black solid 0.2rem; */
		font-size: 1.5rem;
		padding: 0.1rem;
	}
	.capitial {
		grid-area: capitial;
	}
	.items {
		grid-area: items;
	}
	.cybernetics {
		grid-area: cybernetics;
	}
	.abilities {
		grid-area: abilities;
	}

	.container > div {
		padding: 0.5rem;
		border-top: 1px solid #dfdfdf;
	}

	@media screen and (max-width: 700px) {
		.container {
			display: block;
		}
		.container > .image {
			display: none;
		}
	}

	.character-container {
		overflow-y: auto;
	}

	ul {
		padding-bottom: 1.5rem;
	}
</style>

<div class="character-container">
	<div class="title-container">
		<div>
			<h1>{character.name ?? 'Loading...'}</h1>
			<h5>Citizen Dossier</h5>
		</div>
	</div>

	{#if character != null}
		<div class="parent">
			<div class="container">
				<!-- <div>Name: <span>{character.name}</span></div> -->
				<!-- <div class="stats">
					<h4>HP: <span class="points-block">{character.hp || 10}</span></h4>
					<h4>AP: <span class="points-block">{character.ap || 10}</span></h4>
				</div> -->
				<div class="details">
					<div>Pronouns:</div>
					<div>{character.pronouns || 'they/them'}</div>
					<div>Age:</div>
					<div>{character.age || 0} years</div>
					<div>Race:</div>
					<div>
						{#if character.race}
							{character.race.data.attributes.name}
						{/if}
					</div>
					<div>Height:</div>
					<div>{character.height || 0} m</div>
					<div>Weight:</div>
					<div>{character.weight || 0} kg</div>
					<div>Eyes:</div>
					<div>{character.eyes || ''}</div>
					<div>Skin:</div>
					<div>{character.skin || ''}</div>
					<div>Hair:</div>
					<div>{character.hair || ''}</div>

					<div>Specialties:</div>
					<div>
						{#if character.specialties && character.specialties.data}
							<span>{character.specialties.data.map((r) => r.attributes.name).join(', ')}</span>
						{/if}
					</div>

					<div>Vibe:</div>
					<div>{character.vibe || ''}</div>
					<div>Virtues:</div>
					<div>{character.beliefs || ''}</div>
					<div>Flaws:</div>
					<div>{character.flaws || ''}</div>
					<div>Dreams:</div>
					<div>{character.dreams || ''}</div>
					<!-- <div>Background: {character.backstory || ''}</div> -->
				</div>
				<!-- <div class="specialties">
					Specialties:
					{#if character.specialties && character.specialties.data}
						<span>{character.specialties.data.map((r) => r.attributes.name).join(', ')}</span>
					{/if}
				</div> -->
				<!-- <div class="race">
					Race: {#if character.race}
						{character.race.data.attributes.name}
					{/if}
					<h5>Racial Abilities</h5>
					<ul>
						{#if character.race}
							{#each character.race.data.attributes.abilities.data as ability}
								<li class="small-menu-item" data-augmented-ui on:click={() => selectAbility(ability)}>
									<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div> -->
				<div class="image">
					<Image imageUrl={character.imageUrl} title="Profile" />
				</div>
				<div class="capitial">Captial</div>
				<div class="items">Items</div>
				<div class="cybernetics">
					Cybernetics
					<ul>
						{#if character.cybernetics}
							{#each character.cybernetics.data as ability}
								<li class="small-menu-item" data-augmented-ui on:click={() => selectAbility(ability)}>
									<buton> {ability.attributes.name}</buton>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
				<div class="abilities">
					Abilities
					<ul>
						{#if character.race}
							{#each character.race.data.attributes.abilities.data as ability}
								<li class="small-menu-item" data-augmented-ui on:click={() => selectAbility(ability)}>
									<a href="#{ability.attributes.slug}">
										<span>{ability.attributes.name}</span> 
										<i class="bi bi-person" title="racial ability"/>
									</a>
								</li>
							{/each}
						{/if}
						{#if character.selectedAbilities}
							{#each character.selectedAbilities.data as ability}
								<li class="small-menu-item" data-augmented-ui on:click={() => selectAbility(ability)}>
									<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>
