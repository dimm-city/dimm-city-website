<script>
	import Textarea from '$lib/Shared/Components/Textarea.svelte';

	/**
	 * @type {DC.Character}}
	 */
	export let character;
	let isEditing = true;
</script>

<div class="story-row">
	<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip-inset bl-clip-inset both" />
	
	<div class="backstory"><h2>Backstory</h2>
		<Textarea {isEditing} bind:value={character.attributes.backstory} />
	</div>
	<div class="dreams">
		<h2>Dreams</h2>
		<Textarea {isEditing} bind:value={character.attributes.dreams} />
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
	}
	.story-row .row-frame {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
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
