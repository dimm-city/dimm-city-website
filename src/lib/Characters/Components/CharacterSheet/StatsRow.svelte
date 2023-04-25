<script lang="ts">
	import PhysicalStats from './PhysicalStats.svelte';
	import Points from './Points.svelte';
	import { openModal } from 'svelte-modals';
	import AbilityModal from '../AbilityModal.svelte';
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import List from '$lib/Shared/Components/List.svelte';
	import ProfileImage from '../ProfileImage.svelte';

	export let character: ICharacter;
	export let isEditing = false;

	const viewAbility = (ability: any) => openModal(AbilityModal, { data: ability });
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
		<List data={character.cybernetics} maxItems={5} noItemsText="no cybernetics registered">
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
		grid-template-columns: repeat(4fr);
		grid-template-rows: min-content;
		grid-template-areas:
			'image-cell stats-cell scores-cell cyber-cell';
		padding-inline: 1rem;
		padding-block: 0.25rem;
		padding-bottom: 1rem;
		column-gap: 2rem;
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
		gap: 2rem;
		grid-area: stats-cell;
	}
	.image-cell {
		grid-area: 'image-cell';
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
		align-items: start;
		grid-area: scores-cell;
	}

	.cybernetics-container {
		grid-area: 'cyber-cell';
		padding: 0.5rem;
		padding-bottom: 1rem;
	}
	@media (max-width: 768px) {
		.stats-row {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(7, min-content);
			row-gap: 0.5rem;
			grid-template-areas:
				'stats-heading '
				'image-cell'
				'scores-heading'
				'scores-cell'
				'stats-cell'
				'cyber-heading'
				'cyber-cell';
		}
		.stats-heading h3 {
			padding-left: 0;
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
			justify-content: center;
			align-items: center;
			margin-bottom: 1rem;
		}
	}
</style>
