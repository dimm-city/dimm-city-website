<script>
	import Textarea from '$lib/Shared/Components/Textarea.svelte';

	/**
	 * @type {DC.Character}}
	 */
	export let character;
	let isEditing = true;
</script>

<div class="story-row" data-augmented-ui="tl-clip-x tr-clip-x br-clip-inset bl-clip-inset both">
	<div class="backstory">
		<h2>Backstory</h2>
		<Textarea {isEditing} bind:value={character.attributes.backstory} />
	</div>
	<div class="dreams">
		<h2>Dreams</h2>
		<Textarea {isEditing} bind:value={character.attributes.dreams} />
	</div>
	<div class="notes">
		<h2>Notes</h2>
		<Textarea {isEditing} bind:value={character.attributes.playerNotes} />
	</div>
</div>

<style>
	.story-row {
		position: relative;
		padding-top: 1.5rem;
		padding-bottom: 3rem;
		padding-inline: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		gap: 3rem;
		overflow-y: scroll;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-inlay-bg: var(--opaque-dark);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		box-shadow: inset 0 0 5rem var(--secondary-accent-muted);
	}
	h2 {
		margin: 0;
	}
	.dreams {
		width: 100%;
	}
	.backstory {
		width: 100%;
	}
</style>
