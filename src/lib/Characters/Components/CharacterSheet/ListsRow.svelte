<script>
	//import type { ICharacter } from '$lib/Characters/Models/Character';

	import ItemsList from './ItemsList.svelte';

	/**
	 * @type {DC.Character}}
	 */
	export let character;
	export const isEditing = false;
	// @ts-ignore
	export let viewAbility = (ability) => {};
</script>

<div class="lists-row" data-augmented-ui-reset>
	<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip none" />
	<div class="skills-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
		<ItemsList
			header="Skills"
			noItemsText="no skills registered"
			data={character.attributes.selectedAbilities?.data}
			viewItem={viewAbility}
		/>
	</div>
	<div class="items-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
		<ItemsList
			header="Items"
			noItemsText="no inventory recorded"
			data={character.attributes.items?.data}
			viewItem={viewAbility}
		/>
	</div>
	<div class="scripts-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
		<ItemsList
			header="Scripts"
			noItemsText="no scripts detected"
			data={character.attributes.scripts?.data}
			viewItem={viewAbility}
		/>
	</div>
</div>

<style>
	.lists-row {
		position: relative;
		display: grid;
		grid-template-rows: min-content;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.75rem;
		row-gap: 0;
		margin-inline: 0.5rem;
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
		--aug-inlay: 0;
	}
	.lists-row > div {
		position: relative;
		text-align: center;
		padding-inline: 0.75rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
	}

	@media (max-width: 767px) {
		.lists-row {
			padding-top: 2rem;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, max-content);
		}
		.lists-row > div {
			position: relative;
			text-align: center;

			--aug-border-all: 2px;
			--aug-border-bg: var(--fourth-accent);
		}
	}
</style>
