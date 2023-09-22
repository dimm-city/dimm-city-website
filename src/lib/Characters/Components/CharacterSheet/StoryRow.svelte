<script>
	import TextSection from './TextSection.svelte';

	/**
	 * @type {DC.Character}}
	 */
	export let character;
	export let isEditing = false;
</script>

<div class="story-row">
	<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip-inset bl-clip-inset both" />
	<div class="backstory">
		<TextSection header="Backstory" {isEditing} bind:data={character.attributes.backstory} />
	</div>
	<div class="dreams">
		<TextSection header="Dreams" {isEditing} bind:data={character.attributes.dreams} />
	</div>
</div>

<style>
	.story-row {
		position: relative;		
		padding-block: 2rem;
		padding-inline: 1rem;
		display: flex;
		width: 100%;
		column-gap: 3rem;
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
	.dreams {
		width: 100%;
	}
	.backstory {
		width: 100%;
	}

	@media screen and (max-width: 1024px) {
		.story-row {
			flex-wrap: wrap;
			row-gap: 2rem;
		}
	}
</style>
