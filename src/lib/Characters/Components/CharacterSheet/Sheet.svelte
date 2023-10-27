<!-- CharacterSheet.svelte -->
<script>
	import StatsRow from './StatsRow.svelte';
	import ListsRow from './ListsRow.svelte';
	import ProfileRow from './ProfileRow.svelte';
	import Points from './Points.svelte';

	import { openModal } from 'svelte-modals';
	import AbilityModal from '$lib/Abilities/AbilityModal.svelte';
	import StoryRow from './StoryRow.svelte';

	/**@type {DC.Character}*/
	export let character;
	export let isEditing = false;
	export let isPrinting = false;

	const viewAbility = (/** @type {DC.Ability} */ ability) =>
		openModal(AbilityModal, { data: ability });

	let sheetAug = 'bl-2-clip-y br-2-clip-y tl-clip tr-clip t-clip none';

	let originalData = '';
	$: if (character) {
		originalData = JSON.stringify(character);
	} else {
		character = {
			id: '',
			attributes: {}
		};
	}
	$: if (isPrinting) {
		sheetAug = '';
		character.attributes.cybernetics = createEmptyList(5, character.attributes.cybernetics?.data);
		character.attributes.selectedAbilities = createEmptyList(
			24,
			character.attributes.selectedAbilities?.data
		);
		character.attributes.items = createEmptyList(12, character.attributes.items?.data);
		character.attributes.scripts = createEmptyList(8, character.attributes.scripts?.data);
	}

	function createEmptyList(length = 22, existingItems = []) {
		const emptyItems = Array.from({ length }, (_, index) => ({
			id: index + 1,
			attributes: { name: index + 1 + ': ' }
		}));
		return {
			data: [
				...existingItems.map((i, index) => {
					i.attributes.name = index + 1 + ': ' + i.attributes.name;
					return i;
				}),
				...emptyItems.slice(existingItems.length)
			]
		};
	}
</script>

<div class="scroll-wrapper">
	<div class="sheet" data-augmented-ui="none" class:print={isPrinting}>
		<div class="heading">
			<div>
				{#if isEditing}
					<h1 contenteditable="true" bind:textContent={character.attributes.name} />
				{:else}
					<h1>
						{character.attributes.name ?? ''}
					</h1>
				{/if}
			</div>
			<div class="points-heading">
				<div
					class="scores-container"
					data-augmented-ui2="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
				>
					<Points {character} {isEditing} {isPrinting} />
				</div>
			</div>
		</div>
		<div class="container" data-augmented-ui-reset>
			<StatsRow {character} {isEditing} {isPrinting} />
			<div class="points-row">
				<div
					class="scores-container row-frame"
					data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
				>
					<Points {character} {isEditing} {isPrinting} />
				</div>
			</div>
			<ProfileRow {character} {isEditing} />
			<StoryRow {character} {isEditing} />
			<ListsRow {character} {isEditing} {viewAbility} />
		</div>
	</div>
</div>

<style>
	:root {
		--dc-bottom-toolbar-display: none;
	}
	.scroll-wrapper {
		display: grid;
		height: 100%;
		width: 100%;
		overflow: hidden;
		overflow-y: auto;
		padding-inline: 0.25rem;
	}
	.sheet {
		position: relative;

		--aug-border-all: 2px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 9px;
		--aug-tr: 9px;
		--aug-t-center: 33%;
		--aug-t: 10px;
		--aug-inlay-bg: transparent;
		--aug-l: 5px;
		--aug-r: 5px;
		width: 100%;
		height: 100%;
		color: var(--light);
		/* border-radius: 0.5em;
		background-color: var(--content-container-background); */
	}
	div.heading {
		filter: var(--content-container-filter);
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		justify-items: center;
		align-items: end;
		color: var(--fourth-accent);
		white-space: nowrap;
		text-overflow: ellipsis;
		min-height: 75px;
	}
	div.heading > div {
		width: 100%;
		overflow: hidden;
	}

	div.heading > div:first-of-type {
		text-align: left;
		align-items: end;
		padding: 0;
	}
	div.heading > div:first-of-type::after {
		content: 'name:';
		width: 100%;
		display: block;
		border-top: thin var(--fourth-accent) solid;
	}

	div.heading > div:last-of-type {
		text-align: right;
	}

	h1 {
		margin: 0;
	}

	h1[contenteditable],
	h1[contenteditable]:focus-visible {
		border: 1px var(--fourth-accent) solid;
		outline-color: var(--fourth-accent);
		outline-width: 1px;
	}
	h2 {
		margin: 0;
		display: inline;
		font-size: 0.8rem;
		padding-left: 0.5rem;
	}
	.container {
		height: max-content;
		width: 100%;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, min-content) auto;
		gap: 1.5rem;
	}
	.points-heading {
		display: flex;
		justify-content: end;
	}
	.points-row {
		display: none;
	}
	.scores-container {
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 7px;
		--aug-tr: 7px;
		--aug-bl: 7px;
		--aug-br: 7px;
		padding-block: 0.5em;

		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: start;
		grid-area: scores-cell;
	}

	:global(.image > div) {
		--aug-b: 0px;
		--aug-l: 0px;
		--aug-t: 0px;
		--aug-tr: 7px;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}
	:global(.row-frame) {
		--aug-inlay: initial;
		--aug-inlay-bg: var(--content-container-background);
	}
	@media screen and (max-width: 900px) {
		.scroll-wrapper {
			overflow-y: auto;
			padding-inline: 0.5rem;
		}
		div.heading {
			grid-template-columns: 1fr;
			grid-template-rows: min-content;
		}
		.scores-container {
			display: flex;
			justify-content: center;
			width: 100%;
		}
		/* .sheet {
			--aug-border-all: 3px;
			--aug-tl: 9px;
			--aug-tr: 7px;
			--aug-t-center: 50%;
			--aug-t: 5px;
			--aug-inlay-bg: transparent;
			--aug-l: 0px;
			--aug-r: 0px;
		} */
		.points-row {
			display: flex;
		}
		.scores-container {
			padding: 2em;
		}
		.points-heading {
			display: none;
		}
		.container {
			grid-template-rows: repeat(5, min-content) auto;
		}
	}
	@media (max-width: 500px) {
		div.heading {
			grid-template-columns: 1fr;
			grid-template-rows: min-content;
		}

		:global(.image > div) {
			--aug-b: 0px;
			--aug-l: 0px;
			--aug-t: 0px;
			--aug-tr: 7px;
			--aug-border-all: 2px;
			--aug-border-bg: var(--fourth-accent);
		}
	}
</style>
