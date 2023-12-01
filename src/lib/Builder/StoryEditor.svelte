<script>
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';

	/**
	 * @type {DC.Character}}
	 */
	export let character;
	let isEditing = true;
</script>

<ContentPane scrollable={true}>
	<div class="story-row">
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
</ContentPane>

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
