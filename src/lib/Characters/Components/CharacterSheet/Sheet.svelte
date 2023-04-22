<!-- CharacterSheet.svelte -->
<script lang="ts">
  import ListsRow from './ListsRow.svelte';

	import ProfileRow from './ProfileRow.svelte';
	import PhysicalStats from './PhysicalStats.svelte';
	import Points from './Points.svelte';
	import ItemsList from './ItemsList.svelte';

	import { openModal } from 'svelte-modals';
	import AbilityModal from '../AbilityModal.svelte';
	import ContentModal from '../ContentModal.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import List from '$lib/Shared/Components/List.svelte';

	export let character: ICharacter;
	export let isEditing = false;

	const viewAbility = (ability: any) => openModal(AbilityModal, { data: ability });

	const viewText = (text: string) => openModal(ContentModal, { data: text ?? '' });

	const skills: object[] = [];

	let originalData = '';
	$: if (character) {
		originalData = JSON.stringify(character);
	}
</script>

<div class="scroll-wrapper">
	<div
		class="sheet"
		data-augmented-ui="bl-2-clip-y br-2-clip-y tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip both"
	>
		<div class="heading">
			<div>
				<h1>
					{character.name}
				</h1>
			</div>
			<div>
				<button class="aug-button" data-augmented-ui="all-hex"><i class="bi bi-menu-app" /></button>
			</div>
			<div>
				<h2>
					Specialty: {character.specialties?.data?.length > 0
						? character.specialties?.data.join(', ')
						: 'Unknown'}
				</h2>
			</div>
		</div>
		<div class="container" data-augmented-ui-reset>
			<div class="stats-row" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both">
				<div class="stats-heading"><h3>Physical Stats</h3></div>
				<div class="scores-heading" />
				<div class="cyber-heading">
					<h3>Cybernetics</h3>
				</div>
				<div class="stats-container">
					<div class="image">
						<Image imageUrl={character.imageUrl} title={character.name} />
					</div>
					<PhysicalStats {character} {isEditing} />
				</div>
				<div class="scores-container">
					<Points {character} {isEditing} />
				</div>
				<div class="cybernetics-container">
					<List data={skills} maxItems={5} noItemsText="no cybernetics registered">
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
			</div>
			<ProfileRow {character} {isEditing} {viewText}/>
			<ListsRow  {character} {isEditing} {viewAbility}></ListsRow>
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
		grid-template-columns: 1fr 0.3fr 1fr;
		padding-inline: 1.5rem;
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
	}
	div.heading > div:nth-last-of-type(2) {
		text-align: center;
		visibility: hidden; /*TODO: remove to enable button */
	}
	div.heading > div:last-of-type {
		text-align: right;
	}

	div.heading button {
		padding: 0;
	}
	h1 {
		font-size: 1.5rem;
		margin: 0;
		padding-inline: 0.25rem;
		display: inline;
		text-align: left;
	}
	h2 {
		margin: 0;
		display: inline;
		font-size: 0.8rem;
		padding-left: 0.5rem;
	}
	h3 {
		margin: 0;
		color: var(--fourth-accent);
	}
	
	.container {
		height: max-content;
		width: 100%;
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: 1fr;
		/* grid-template-rows: 0.5fr 0.2fr 0.3fr; */
		grid-template-rows: min-content min-content auto;
		gap: 0.5rem;
	}

	
	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: min-content 1fr;
		grid-template-areas:
			'stats-heading scores-heading cyber-heading'
			'stats-cell scores-cell cyber-cell';
		padding-inline: 1rem;
		padding-block: 0.25rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
	}
	.stats-heading {
		grid-area: stats-heading;
	}
	.stats-heading h3 {
		padding-left: 1rem;
	}
	.stats-container {
		position: relative;
		display: flex;
		flex-direction: row;
		grid-area: stats-cell;
	}
	.image {
		padding: 0.5rem;
		--dc-image-aspect-ratio: 3/4;
		--dc-image-height: 240px;
	}

	:global(.image > div) {
		--aug-b: 3px;
		--aug-l: 3px;
		--aug-t: 3px;
		--aug-tr: 7px;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}

	.scores-heading {
		grid-area: scores-heading;
	}

	.scores-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		grid-area: scores-cell;
	}


	@media (max-width: 768px) {
		.scroll-wrapper {
			overflow-y: auto;
			padding-inline: 0.5rem;
		}
		.sheet {
			--aug-border-all: 3px;
			--aug-tl: 3px;
			--aug-tr: 3px;
			--aug-t-center: 50%;
			--aug-t: 5px;
			--aug-inlay-bg: transparent;
			--aug-l: 0px;
			--aug-r: 0px;
		}
		.container {
			grid-template-rows: auto;
		}
		.stats-row {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(6, min-content);
			row-gap: 0.5rem;
			grid-template-areas:
				'stats-heading '
				'stats-cell'
				'scores-heading'
				'scores-cell'
				'cyber-heading'
				'cyber-cell';
		}
		.scores-container {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-bottom: 1rem;
		}

	}
</style>
