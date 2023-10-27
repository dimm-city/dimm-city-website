<script>
	//import type { ICharacter } from '$lib/Characters/Models/Character';

	import ItemsList from './ItemsList.svelte';
	import TextSection from './TextSection.svelte';

	/**
	 * @type {DC.Character}}
	 */
	export let character;
	export const isEditing = false;
	// @ts-ignore
	export let viewAbility = (ability) => {};
</script>

<div class="lists-row" data-augmented-ui-reset>
	<div class="row-frame" data-augmented-ui="tl-rect tr-rect br-clip-inset bl-clip-inset both" />
	<div class="skills-container" data-augmented-ui="tl-clip tr-clip br-2-clip-xy bl-clip border">
		<ItemsList
			header="Skills"
			noItemsText="no skills registered"
			data={character.attributes.selectedAbilities?.data}
			viewItem={viewAbility}
		/>
	</div>
	<div class="items-container" data-augmented-ui="tl-clip tr-clip br-clip bl-2-clip-xy border">
		<ItemsList
			header="Items"
			noItemsText="no inventory recorded"
			data={character.attributes.items?.data}
			viewItem={viewAbility}
		/>
	</div>
	<div class="scripts-container" data-augmented-ui="tl-2-clip-xy tr-clip br-clip bl-clip border">
		<ItemsList
			header="Scripts"
			noItemsText="no scripts detected"
			data={character.attributes.scripts?.data}
			viewItem={viewAbility}
		/>
	</div>
	<div class="notes-container" data-augmented-ui="tl-clip tr-2-clip-xy br-clip bl-clip border">
		<h3 class="section-title">Notes</h3>
			<TextSection data={character.attributes.playerNotes} aug="none" />
		
	</div>
</div>

<style>
	.lists-row {
		--default-aug: 7px;
		position: relative;
		display: grid;
		gap: 1.5rem;
		margin-inline: 0.5rem;
		width: 100%;
		margin: auto;
		padding-block: 2rem;
		padding-inline: 1.5rem;
		overflow: hidden;
		grid-template-rows: 3fr 1fr;
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas:
			'skills skills items'
			'notes notes scripts';
	}
	.lists-row .row-frame {
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
	.lists-row > div {
		position: relative;
		text-align: start;
		padding-inline: 1.25rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
	}

	.skills-container {
		--aug-br: var(--default-aug);
		grid-area: skills;
	}
	.scripts-container {
		--aug-tl: var(--default-aug);
		grid-area: scripts;
	}
	.items-container {
		--aug-bl: var(--default-aug);
		grid-area: items;
	}
	.notes-container {
		--aug-tr: var(--default-aug);
		grid-area: notes;
	}
	.notes-container .section-title{
		justify-content: start;
		padding-inline-start: .5em;
	}
	/* .notes-container .text-content {
		display: flex;
		justify-content: start;
	} */
	@media (max-width: 767px) {
		.lists-row {
			padding-top: 1rem;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, max-content);
			grid-template-areas:
			'skills'
			'items'
			'scripts';
		}
		.notes-container{
			display: none;
		}
		.lists-row > div {
			position: relative;
			text-align: center;

			--aug-border-all: 2px;
			--aug-border-bg: var(--fourth-accent);
		}
	}
</style>
