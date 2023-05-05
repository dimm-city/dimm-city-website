<script>
	//import type { ICharacter } from '$lib/Characters/Models/Character';

	import ItemsList from './ItemsList.svelte';

	/**
	 * @type {{ selectedAbilities: object[]; items: object[]; scripts: object[]; }}}
	 */
	export let character;
	export let isEditing = false;
	// @ts-ignore
	export let viewAbility = (ability) => {};
</script>

<div class="lists-row" data-augmented-ui-reset>
	<div class="skills-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
		<ItemsList
			header="Skills"
			noItemsText="no skills registered"
			data={character.selectedAbilities?.data}
			viewItem={viewAbility}
		/>
	</div>
	<div class="items-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
		<ItemsList
			header="Items"
			noItemsText="no inventory recorded"
			data={character.items?.data}
			viewItem={viewAbility}
		/>
	</div>
	<div class="scripts-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
		<ItemsList
			header="Scripts"
			noItemsText="no scripts detected"
			data={character.scripts?.data}
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
		gap: 0.33rem;
		row-gap: 0;
		margin-inline: 0.5rem;
	}
	.lists-row > div {
		position: relative;
		text-align: center;
		padding-inline: 0.75rem;
		margin-bottom: 2.5rem;
		--aug-border-all: 2px;
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
