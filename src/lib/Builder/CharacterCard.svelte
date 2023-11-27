<script>
	import { formatCharacterSpecialties } from '$lib/Shared/FormatFunctions';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();
	/**
	 * @type {DC.Character}
	 */
	export let character;

	export let selected = false;
</script>

<div
	on:mouseenter
	on:mouseleave
	on:click
	on:keydown
	class="menu-item-container"
	class:selected
	role="button"
	tabindex="0"
>
	<div class="menu-item" data-augmented-ui>
		<div class="character-card">
			<h2>{character.attributes.name}</h2>
			<h3>{character.attributes.tokenId}</h3>
			<img
				data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
				src={character.attributes.mainImage?.data?.attributes.formats?.small.url}
				alt={character.attributes.name}
			/>

			<div class="details">
				<p>{formatCharacterSpecialties(character)}</p>
				<p>{character.attributes.currentLocation?.data?.attributes.name ?? 'Unknown'}</p>
			</div>
		</div>
	</div>
	<div class="panel" class:selected>
		<button data-augmented-ui  class="aug-button" on:click={() => dispatcher('edit', character)}>Edit</button>
		<button data-augmented-ui class="aug-button" on:click={() => dispatcher('view', character)}>View</button>
		<button data-augmented-ui class="aug-button" on:click={() => dispatcher('print', character)}>Print</button>
	</div>
</div>

<style>
	.character-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background-color: transparent;
	}

	h2 {
		margin-top: 0;
	}
	h3 {
		margin-bottom: 1em;
	}
	img {
		max-width: 100%;
		height: 300px;
		margin-bottom: 1rem;
	}

	.details {
		text-align: center;
	}

	:root {
		--dc-menu-item-background-color: transparent;
		--dc-menu-item-selected-color: rgb(255, 20, 204, 0.35);
		--dc-menu-item-selected-drop-shadow-color: rgb(255, 20, 204, 0.85);
		--dc-menu-item-selected-drop-shadow: 0 0 20px 10px
			var(--dc-menu-item-selected-drop-shadow-color);
	}
	.menu-item-container {
		position: relative;
		background: var(--dc-menu-item-background-color);
		display: grid;
		height: var(--dc-menu-item-height);
		width: var(--dc-menu-item-width);
    overflow: hidden;
	}
	.menu-item-container::before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	}
	.menu-item-container.selected::before {
		box-shadow: inset var(--dc-menu-item-selected-drop-shadow);
		transition: all 0.1s ease-in-out;
	}

	.selected .menu-item {
		/* clip-path: border-box; */
		--aug-tl1: 0vh;
		--aug-tr1: 0vh;
		--aug-br1: 0vh;
		--aug-bl1: 0vh;
		--aug-border-bg: var(--dc-menu-item-selected-color);
		--aug-border-all: 2px;
		background-color: var(--menu-inlay-bg-color-hover);
	}

	.panel {
		position: absolute;
		bottom: -500px;
		opacity: 0;
    right: 0;
    left: 0;
		background: black;
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border: 1px solid var(--third-accent);
		transition: var(--dc-character-card-transition);
	}

  .panel .aug-button{
    --aug-tr1: 0.5rem;
  }
	.selected.panel {
		bottom: 0;
		opacity: 1;
		transition: var(--dc-character-card-transition);
	}
</style>
