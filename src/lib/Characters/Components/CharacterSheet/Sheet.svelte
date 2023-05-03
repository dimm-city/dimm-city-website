<!-- CharacterSheet.svelte -->
<script lang="ts">
	import StatsRow from './StatsRow.svelte';
	import ListsRow from './ListsRow.svelte';
	import ProfileRow from './ProfileRow.svelte';

	import { openModal } from 'svelte-modals';
	import AbilityModal from '../AbilityModal.svelte';
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import StoryRow from './StoryRow.svelte';

	export let character: ICharacter;
	export let isEditing = false;

	const viewAbility = (ability: any) => openModal(AbilityModal, { data: ability });

	const skills: object[] = [];

	let originalData = '';
	$: if (character) {
		originalData = JSON.stringify(character);
	}
</script>

<div class="scroll-wrapper">
	<div
		class="sheet"
		data-augmented-ui="bl-2-clip-y br-2-clip-y tl-clip tr-clip t-clip both"
	>
		<div class="heading">
			<div>
				{#if isEditing}
					<h1 contenteditable="true" bind:textContent={character.name} />
				{:else}
					<h1>
						{character.name}
					</h1>
				{/if}
			</div>
			<div class="specialties-heading">
				<h2>
					<!-- ts-ignore-->
					{character.specialties?.data?.length > 0
						? character.specialties?.data?.map((s) => s?.attributes?.name).join(', ')
						: 'Unknown'}
				</h2>
			</div>
		</div>
		<div class="container" data-augmented-ui-reset>
			<StatsRow {character} {isEditing} />
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
		background-color: var(--content-container-background);
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
		grid-auto-flow: row;
		grid-template-columns: 1fr;
		grid-template-rows: min-content min-content min-content auto;
		gap: 0.5rem;
	}

	:global(.image > div) {
		--aug-b: 0px;
		--aug-l: 0px;
		--aug-t: 0px;
		--aug-tr: 7px;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}

	@media (max-width: 767px) {
		.scroll-wrapper {
			overflow-y: auto;
			padding-inline: 0.5rem;
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
		.container {
			grid-template-rows: auto;
		}
	}
	@media (max-width: 500px) {
		div.heading {
			grid-template-columns: 1fr;
		}
		.specialties-heading {
			display: none;
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
