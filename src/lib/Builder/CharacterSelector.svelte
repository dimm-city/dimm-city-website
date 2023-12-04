<script>
	import CharacterCard from '$lib/Builder/CharacterCard.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { availableCharacters, selectedCharacter, loadCharacter } from './BuilderStore.js';


</script>

<ContentPane padding={3} scrollable={true}>
	<div class="select">
		<h1>Select your Sporo</h1>
		<div class="characters">
			{#each $availableCharacters as c}
				<div class="character-card-container" class:selected={c.id === $selectedCharacter?.id}>
					<CharacterCard
						character={c}
						on:click={(e) => $selectedCharacter = {...c}}
						on:edit
						on:view
						on:print
						selected={c.id === $selectedCharacter?.id}
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
