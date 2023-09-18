<script>
	import PhysicalStats from './PhysicalStats.svelte';
	import Points from './Points.svelte';
	import { openModal } from 'svelte-modals';
	import AbilityModal from '../../../Abilities/AbilityModal.svelte';
	import List from '$lib/Shared/Components/List.svelte';
	import ProfileImage from '../ProfileImage.svelte';

	/**
	 * @type {DC.Character}
	 */
	 export let character;
	export let isEditing = false;

	const viewAbility = (/** @type {DC.Ability} */ ability) => openModal(AbilityModal, { data: ability });
</script>

<div class="stats-row" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both">
	<div class="image-cell">
		<div class="image">
			<ProfileImage {character} />
		</div>
	</div>
	<div class="stats-container">
		<!-- <h3>Physical Stats</h3> -->
		<PhysicalStats {character} {isEditing} />
	</div>
	<div class="scores-container">
		<Points {character} {isEditing} />
	</div>
	<div class="cybernetics-container">
		<h3>Cybernetics</h3>
		<List data={character.attributes?.cybernetics?.data} maxItems={5} noItemsText="no cybernetics registered">
			<div let:item slot="item">
				<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
					>{item.attributes.name}</button
				>
			</div>
		</List>
	</div>
</div>

<style>
	.stats-row {
		display: grid;
		grid-template-columns: min-content 1fr 2fr;
		grid-template-rows: min-content auto;
		grid-template-areas:
			'image-cell stats-cell cyber-cell'
			'scores-cell stats-cell cyber-cell';
		padding: 1rem;
		column-gap: 2rem;
        row-gap: 1rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
	}

	.stats-container {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		grid-area: stats-cell;
	}
	.image-cell {
		grid-area: 'image-cell';
	}
	.image {
		--dc-image-aspect-ratio: 3/4;
		--dc-image-height: 240px;
		--dc-image-width: auto;
	}

	:global(.image > div) {
		--aug-b: 3px;
		--aug-l: 3px;
		--aug-t: 3px;
		--aug-tr: 7px;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
		margin: auto;
	}

	.scores-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: start;
		grid-area: scores-cell;
	}

	.cybernetics-container {
		grid-area: 'cyber-cell';
		padding-bottom: 1rem;
	}
	@media (max-width: 900px) {
		.stats-row {
			grid-template-columns: min-content 1fr;
			grid-template-rows: min-content auto;
			grid-template-areas:
				'image-cell stats-cell'
				'scores-cell cyber-cell';
		}
	}
	@media (max-width: 767px) {
		.stats-row {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(7, min-content);
			row-gap: 0.5rem;
			grid-template-areas:
				'image-cell'
				'scores-cell'
				'stats-cell'
				'cyber-cell';
		}
		.image {
			padding: 0.5rem;
			--dc-image-aspect-ratio: 3/4;
			--dc-image-height: min-content;
			--dc-image-width: 75dvw;
		}

		:global(.image > div) {
			--aug-b: 3px;
			--aug-l: 3px;
			--aug-t: 3px;
			--aug-tr: 7px;
			--aug-border-all: 2px;
			--aug-border-bg: var(--fourth-accent);
		}
		.scores-container {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: center;
			margin-bottom: 1rem;
		}
	}
</style>
