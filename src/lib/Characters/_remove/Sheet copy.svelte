<!-- CharacterSheet.svelte -->
<script lang="ts">
	import type { ICharacter } from "./Models/Character";


	export let character: ICharacter;
</script>

<div class="character-sheet">
	<div class="left-column">
		<img class="character-image" src={character.imageUrl} alt={character.name} />
		<div class="character-stats">
			<!-- <p><strong>HP:</strong> {character.hp}</p>
			<p><strong>AP:</strong> {character.ap}</p>
			<p><strong>Specialty:</strong> {character.specialties?.join(', ')}</p> -->
			<p><strong>Location:</strong> {character.currentLocation}</p>
			<p><strong>Race:</strong> {character.race?.name ?? 'Unknown'}</p>
			<p><strong>Eyes:</strong> {character.eyes ?? 'Unknown'}</p>
			<p><strong>Skin:</strong> {character.skin}</p>
			<p><strong>Vibe:</strong> {character.vibe}</p>
			<!-- <p><strong>Inventory:</strong> {character.items?.join(', ')}</p> -->
			<!-- <p><strong>Abilities:</strong> {character.selectedAbilities?.join(', ')}</p> -->
		</div>
	</div>
	<div class="right-column">
		<h2>{character.name}</h2>
		<p><strong>Backstory:</strong></p>
		<p class="long-text">{character.backstory}</p>
		<p><strong>Virtues:</strong></p>
		<p class="long-text">{character.beliefs}</p>
		<p><strong>Flaws:</strong></p>
		<p class="long-text">{character.flaws}</p>
		<p><strong>Dreams:</strong></p>
		<p class="long-text">{character.dreams}</p>
	</div>
</div>

<style>
	/* Define your own styles here */
	.character-sheet {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border: 2px solid #ccc;
		border-radius: 0.5rem;
		max-width: 100%;
		overflow: hidden;
	}

	.left-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-right: 1rem;
		max-width: 50%;
	}

	.right-column {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		text-align: left;
		max-width: 50%;
	}

	.character-image {
		width: 100%;
		max-width: 20rem;
		border-radius: 50%;
		margin-bottom: 1rem;
	}

	.character-stats {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		max-width: 100%;
	}

	.long-text {
		white-space: pre-wrap;
	}

	@media screen and (max-width: 767px) {
		/* If screen width is less than 768px, use a single
      column layout */
		.character-sheet {
			flex-direction: column;
			text-align: center;
		}

		.left-column,
		.right-column {
			max-width: 100%;
		}

		.character-image {
			max-width: 100%;
		}
	}
</style>
