<script>
	// import PhysicalStats from './PhysicalStats.svelte';
	import { openModal } from 'svelte-modals';
	import AbilityModal from '$lib/Abilities/AbilityModal.svelte';
	// import ItemsList from './ItemsList.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import ItemsList from '$lib/Characters/Components/CharacterSheet/ItemsList.svelte';

	/**
	 * @type {DC.Race}
	 */
	export let race;
	export let isEditing = false;

	const viewAbility = (/** @type {DC.Ability} */ ability) =>
		openModal(AbilityModal, { data: ability });
</script>

<div class="stats-row row-frame" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both">
	<div class="image-cell">
		<div class="image">
			<Image title="Image of the race" imageUrl={race.attributes.mainImage.data?.attributes.url} />
		</div>
	</div>
	<div class="stats-container">
		<p><strong>HP:</strong> {race.attributes.hp}</p>
		<p><strong>ATK:</strong> {race.attributes.atk}</p>
		<!-- <p><strong>Playable:</strong> {race.attributes.playable ? 'Yes' : 'No'}</p> -->

		<!-- <h4>Common locations</h4>
		<ul>
			{#each race.attributes.locations.data as location}
				<li>{location.attributes.name}</li>
			{/each}
		</ul> -->
		<p>
			<strong>Appearance:</strong>
			<span>{race.attributes.appearance ?? 'Unknown'}</span>
		</p>
	</div>
	<div class="cybernetics-container">
		<ItemsList
			header="Skills"
			noItemsText="no skills registered"
			data={race.attributes.abilities?.data}
			viewItem={viewAbility}
		/>
	</div>
</div>

<style>
	.stats-row {
		display: grid;
		grid-template-columns: min-content 1fr 1fr;
		grid-template-rows: min-content;
		grid-template-areas: 'image-cell stats-cell cyber-cell';
		padding-block: 1.25em;
		padding-inline: 1.25rem;
		column-gap: 2rem;
		row-gap: 1rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
	}

	.stats-container {
		grid-area: stats-cell;
	}
	.image-cell {
		grid-area: image-cell;
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

	.cybernetics-container {
		grid-area: cyber-cell;
		padding-bottom: 1rem;
		border-left: 1px solid var(--fourth-accent);
	}
	:global(.cybernetics-container .list .list-item) {
		text-align: center;
	}
	@media screen and (max-width: 900px) {
		.stats-row {
			grid-template-columns: min-content 1fr;
			grid-template-rows: min-content auto;
			grid-template-areas:
				'image-cell stats-cell'
				'cyber-cell cyber-cell';
		}
		.cybernetics-container {
			border-left: none;
			border-top: 1px solid var(--fourth-accent);
		}
	}
	@media screen and (max-width: 767px) {
		.stats-row {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: auto;
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
	}
</style>
