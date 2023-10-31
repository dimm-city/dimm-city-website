<script>
	import Points from './Points.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import ItemsList from '$lib/Characters/Components/CharacterSheet/ItemsList.svelte';

	import { openModal } from 'svelte-modals';
	import AbilityModal from '$lib/Abilities/AbilityModal.svelte';
	/** @type {DC.Race}*/
	export let race;
	export let isEditing = false;
	export let isPrinting = false;

	const viewAbility = (/** @type {DC.Ability} */ ability) =>
		openModal(AbilityModal, { data: ability });
</script>

<div class="scroll-wrapper">
	<div class="sheet" data-augmented-ui="none">
		<div class="heading">
			<div>
				{#if isEditing}
					<h1 contenteditable="true" bind:textContent={race.attributes.name} />
				{:else}
					<h1>
						{race.attributes.name ?? ''}
					</h1>
				{/if}
			</div>
			<div class="points-heading">
				<div
					class="scores-container"
					data-augmented-ui2="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
				>
					<Points data={race} {isEditing} {isPrinting} />
				</div>
			</div>
		</div>
		<article class="container" data-augmented-ui-reset>
			<div class="top-row">
				<div class="stats-row">
					<div class="cell-frame" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both" />

					<div class="image">
						<Image
							title="Image of the race"
							imageUrl={race.attributes.mainImage.data?.attributes.url}
						/>
					</div>
					<p>
						<strong>Size:</strong>
						<span>{race.attributes.size ?? 'Unknown'}</span>
					</p>

					<p>
						<strong>Ideals:</strong>
						<span>{race.attributes.ideals ?? 'Unknown'}</span>
					</p>
					<p>
						<strong>Flaws:</strong>
						<span>{race.attributes.flaws ?? 'Unknown'}</span>
					</p>
					<p>
						<span>{race.attributes.appearance ?? 'Unknown'}</span>
					</p>
				</div>
				<div class="points-cell">
					<div
						class="cell-frame"
						data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x border"
					/>
					<Points data={race} {isEditing} {isPrinting} />
				</div>
				<div class="abilities-container">
					<div class="cell-frame" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both" />

					<ItemsList
						header="Abilities"
						noItemsText="no abilities registered"
						data={race.attributes.abilities?.data}
						viewItem={viewAbility}
					/>
				</div>
			</div>
			<div class="profile-row">
				<section class="section-container profile">
					<div>
						<div
							class="cell-frame"
							data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
						/>
						<h4>Common locations</h4>
						<ul>
							{#each race.attributes.locations.data as location}
								<li>{location.attributes.name}</li>
							{/each}
						</ul>
					</div>
					<div>
						<div
							class="cell-frame"
							data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
						/>
						<h4>Allies</h4>
						<ul>
							{#each race.attributes.allies.data as ally}
								<li>{ally.attributes.name}</li>
							{/each}
						</ul>
					</div>
					<div>
						<div
							class="cell-frame"
							data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
						/>
						<h4>Enemies</h4>
						<ul>
							{#each race.attributes.enemies.data as enemy}
								<li>{enemy.attributes.name}</li>
							{/each}
						</ul>
					</div>
				</section>
			</div>
			<div class="description-row">
				<div class="cell-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip both" />
				<section class="section-container description">
					<div>
						<h3>Description</h3>
						<hr />
						<p>{race.attributes.description ?? 'Unable to locate description.'}</p>
					</div>
				</section>
			</div>
		</article>
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

	h1 {
		margin: 0;
	}

	h1[contenteditable],
	h1[contenteditable]:focus-visible {
		border: 1px var(--fourth-accent) solid;
		outline-color: var(--fourth-accent);
		outline-width: 1px;
	}
	.points-heading {
		display: flex;
		justify-content: end;
	}
	.points-cell {
		display: none;
		position: relative;
		padding: 1.5rem;

		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		width: 100%;
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

	:global(.image > div) {
		--aug-b: 0px;
		--aug-l: 0px;
		--aug-t: 0px;
		--aug-tr: 7px;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}
	.cell-frame {
		--aug-inlay: initial;
		--aug-inlay-bg: var(--content-container-background);
		z-index: -1;
	}

	.section-container.profile {
		display: grid;
		grid-area: profile;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-flow: row;
	}

	.section-container.profile > div {
		position: relative;
		padding: 1.5rem;
	}

	.profile-row,
	.description-row {
		position: relative;
		width: 100%;

		padding-block: 2rem;
		padding-inline: 1rem;
	}
	.profile-row {
		padding: 0;
	}

	.cell-frame {
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
	/**race*/
	.top-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	.image {
		--dc-image-aspect-ratio: 3/4;
		--dc-image-height: 240px;
		--dc-image-width: auto;
		float: left;
		padding-right: 1em;
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

	.abilities-container {
		position: relative;
		padding: 1rem;
	}
	.abilities-container .cell-frame {
		--aug-border-left: 0px;
	}

	.stats-row {
		position: relative;

		padding-block: 1.25em;
		padding-inline: 1.25rem;
	}
	h4 {
		margin: 0;
		color: var(--fourth-accent);
	}

	ul {
		padding: 0;
	}

	p > strong {
		color: var(--fourth-accent);
	}

	/* Media Queries */
	@media screen and (max-width: 900px) {
		.scroll-wrapper {
			overflow-y: auto;
			padding-inline: 0.5rem;
		}

		.top-row {
			grid-template-columns: 1fr;
			row-gap: 1rem;
		}
		.abilities-container .cell-frame {
			--aug-tr-inset2: calc(var(--aug-tr1) * 2);
			--aug-tl-inset1: calc(var(--aug-tl1) * 2);
			--aug-border-left: unset;
		}
		.section-container.profile {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, min-content) auto;
			row-gap: 1rem;
		}

		.section-container.profile > div:first-of-type {
			grid-column: span 2;
		}

		.container {
			grid-template-rows: repeat(5, min-content) auto;
		}
	}
	@media screen and (max-width: 768px) {
		div.heading {
			grid-template-columns: 1fr;
			grid-template-rows: min-content;
		}
		
		.scores-container {
			display: flex;
			justify-content: center;
			width: 100%;
			margin-inline: auto;
		}
		.section-container.profile {
			grid-template-columns: repeat(1, 1fr);
			gap: 1rem;
		}
		.stats-row p{
			margin-inline: auto;
		}
		.section-container.profile > div:first-of-type {
			grid-column: unset;
		}
		.points-heading {
			display: none;
		}

		.points-cell {
			display: flex;
		}
	}
	@media screen and (max-width: 500px) {
		
		.image {
			padding: 0.5rem;
			float:none;
			--dc-image-aspect-ratio: 3/4;
			--dc-image-height: unset;
			--dc-image-width: auto;
		}
	}
</style>
