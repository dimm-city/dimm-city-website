<script lang="ts">
	import { onMount } from 'svelte';
	import { getCharacterQuery } from '../../queries/getCharacter';
	import { getCharacterBySlugQuery } from '../../queries/getCharacterBySlug';
	import { config } from '$lib/config';
	import './characters.css';
	import { characters, myCollection } from '$lib/ShellStore';
	export let tokenId; // `dcs1r1-${id}`;
	let character;

	$: if (!tokenId || tokenId.length < 1) {
		character = {};
	}
	let query = new Promise(() => {});

	function loadCharacter() {
		character = $characters.find((c) => c.tokenId === tokenId);
		if (character) return character;

		return fetch(config.graphUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: getCharacterBySlugQuery,
				variables: { tokenId }
			})
		})
			.then(async (response) => {
				if (response.ok) {
					const json = await response.json();
					console.log('data', tokenId, json);

					character =
						json.data.characters.data && json.data.characters.data.length > 0
							? json.data.characters.data[0].attributes
							: null;
					const keys = tokenId.split('-');
					console.log('keys', keys);

					const sporo = $myCollection.find((s) => s.release === keys[0] && s.edition == keys[1]);

					if (character != null) {
						character.metadata = sporo;
						character.thumbnail_uri = sporo.thumbnail_uri;
					} else {
						console.log('no character for sporo', sporo);

						character = Object.assign({}, sporo);
					}
					$characters.push(character);
					return character;
				}
				return null;
			})
			.catch((reason) => {
				console.log('loadCharacter failed', reason);
			});
	}
	onMount(() => {
		console.log('mount character', tokenId);

		query = loadCharacter();
	});
</script>

<div class="character-container">
	{#await query}
		Loading...
	{:then}
		<div class="title-container">
			<div>
				<h1>Dimm City</h1>
				<h5>Character Sheet</h5>
			</div>
		</div>

		{#if character != null}
			<div class="parent">
				<div class="container">
					<div>Name:{character.name}</div>
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
					<div>
						Role(s):
						<ul>
							{#if character.roles}
								{#each character.roles.data as role}
									<li>{role.attributes.name}</li>
								{/each}
							{/if}
						</ul>
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
						<img src={character.thumbnail_uri} alt="profile" />
					</div>

					<div>
						Racial Abilities
						<ul>
							{#if character.race}
								{#each character.race.data.attributes.abilities.data as ability}
									<li class="small-menu-item" data-augmented-ui>
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
									<li class="small-menu-item" data-augmented-ui>
										<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
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
									<li class="small-menu-item" data-augmented-ui>
										<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
									</li>
								{/each}
							{/if}
						</ul>
					</div>
				</div>
			</div>
		{/if}
	{/await}
</div>

<style>
	.character-container {
		overflow-y: auto;
	}
</style>
