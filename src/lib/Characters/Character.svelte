<script lang="ts">
	import { onMount } from 'svelte';
	import { loadCharacter } from '../queries/getCharacterBySlug';
	import { config } from '$lib/config';
	import { characters, myCollection, showMenu } from '$lib/ShellStore';
	import { openModal } from 'svelte-modals';
	import AbilityModal from './AbilityModal.svelte';
	import { Character } from './Character';
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
		grid-template-columns: 1.2fr minmax(180px 0.7fr) 1.1fr;
		grid-template-rows: 0.1fr 0.2fr minmax(250px, 0.2fr) minmax(100px, 0.9fr) 0.9fr;
		gap: 0px 1em;
		grid-auto-flow: row;
		align-content: start;
		grid-template-areas:
			'. . image'
			'. details image'
			'. details image'
			'. . .'
			'. abilities abilities';
		width: 100%;
		height: 100%;
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
	}

	.details > div {
		padding-bottom: 0.25rem;
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

	.abilities {
		grid-area: abilities;
	}

	.container > div {
		padding: 0.5rem;
		border-top: 1px solid #dfdfdf;
	}

	img {
		max-height: 400px;
		max-width: 300px;
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
</style>

<div class="character-container">
	<div class="title-container">
		<div>
			<h1>Dimm City</h1>
			<h5>Citizen Dossier</h5>
		</div>
	</div>

	{#if character != null}
		<div class="parent">
			<div class="container">
				<div>Name: <span>{character.name}</span></div>
				<div class="stats">
					<h4>HP: <span class="points-block">{character.hp || 10}</span></h4>
					<h4>AP: <span class="points-block">{character.ap || 10}</span></h4>
				</div>
				<div class="details">
					<div>Pronouns: {character.pronouns || 'they/them'}</div>
					<div>Age: {character.age || 0} years</div>
					<div>Height: {character.height || 0} m</div>
					<div>Weight: {character.weight || 0} kg</div>
					<div>Eyes: {character.eyes || ''}</div>
					<div>Skin: {character.skin || ''}</div>
					<div>Hair: {character.hair || ''}</div>
					<div>Vibe: {character.vibe || ''}</div>
					<!-- <div>Accessories: {character.height}</div> -->
				</div>
				<div class="specialties">
					Specialties:
					{#if character.specialties && character.specialties.data}
						<span>{character.specialties.data.map((r) => r.attributes.name).join(', ')}</span>
					{/if}
				</div>
				<div>
					Race: {#if character.race}
						{character.race.data.attributes.name}
					{/if}
				</div>

				<div class="image">
					<!-- <img
							src="https://lh3.googleusercontent.com/TFxb5LSw_-CdlY_JZ27-LBYzwCallPv6ZLNJQrhWSOoUUy2YKnd1VqZaOjotTPk-hjZ73UiC0kaCbb__4lbJ2_CYxFjN8iYqX37m5g=w600"
							alt=""
						/> -->
					<img src={character.imageUrl} alt="profile" />
				</div>

				<div>
					Racial Abilities
					<ul>
						{#if character.race}
							{#each character.race.data.attributes.abilities.data as ability}
								<li class="small-menu-item" data-augmented-ui on:click={() => selectAbility(ability)}>
									<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
				<div>Captial</div>
				<div>
					Cybernetics
					<ul class="aug-list">
						{#if character.cybernetics}
							{#each character.cybernetics.data as ability}
								<li class="small-menu-item" data-augmented-ui on:click={() => selectAbility(ability)}>
									<buton> {ability.attributes.name}</buton>
								</li>
							{/each}
						{/if}
					</ul>
				</div>

				<div class="items">Items</div>
				<div class="abilities">
					Abilities
					<ul>
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
