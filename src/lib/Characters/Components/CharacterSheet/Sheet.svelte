<!-- CharacterSheet.svelte -->
<script lang="ts">
	import { openModal } from 'svelte-modals';
	import AbilityModal from '../AbilityModal.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import List from '$lib/Shared/Components/List.svelte';

	export let character: ICharacter;

	function viewAbility(ability: any) {
		openModal(AbilityModal, { data: ability });
	}

	const skills = [];
	for (let index = 0; index < 10; index++) {
		skills.push({
			attributes: {
				name: `ability ${index}`,
				ap: Math.round(index / 2),
				description: 'does some cool stuff and then ' + index + ' more things...'
			}
		});
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
						<Image imageUrl={character.imageUrl} title="Profile" height="200px" width="150px" />
					</div>
					<div class="physical-stats">
						<div>
							Pronouns:
							<span>{character.pronouns || 'they/them'}</span>
						</div>
						<div>
							Age:
							<span>{character.age ?? 'Unknown'} </span>
						</div>
						<div>
							Race:
							<span>
								{#if character.race}
									{character.race.data.attributes.name}
								{/if}
							</span>
						</div>
						<div>
							Height:
							<span>{character.height || 0} m</span>
						</div>
						<div>
							Weight:
							<span>{character.weight || 0} kg</span>
						</div>
						<div>
							Eyes:
							<span>{character.eyes || ''}</span>
						</div>
						<div>
							Skin:
							<span>{character.skin || ''}</span>
						</div>
						<!-- <div>
						Hair:
						<span>{character.hair || ''}</span>
					</div> -->
					</div>
				</div>
				<div class="scores-container">
					<div class="hp">
						<h4>HP</h4>
						<div data-augmented-ui="all-hex border">
							<span>10</span><small>10</small>
						</div>
					</div>
					<div class="ap">
						<h4>AP</h4>
						<div data-augmented-ui="all-hex border">10</div>
					</div>
				</div>
				<div class="cybernetics-container">
					<List data={skills} maxItems={5}>
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
			</div>
			<div class="profile-row" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip border">
				<div class="profile-heading"><h3>Profile</h3></div>
				<section class="section-container">
					<div>
						Vibe:
						<span>{character.vibe || 'they/them'}</span>
					</div>
					<div>
						Beliefs:
						<span>{character.beliefs ?? 'Unknown'} </span>
					</div>
					<div>
						Flaws:<span>{character.flaws ?? 'Unknown'} </span>
					</div>
					<div>
						Origin:<span>{character.currentLocation?.name ?? 'Unknown'} </span>
					</div>
					<div>
						Current District:
						<span>{character.currentLocation?.name ?? 'Unknown'} </span>
					</div>
				</section>
				<section class="section-container">
					<div class="text-section">
						<span>Backstory:</span>
						<div class="text-container" data-augmented-ui=" tr-clip bl-clip border">
							{character.backstory}
						</div>
					</div>
				</section>
				<section class="section-container">
					<div class="text-section">
						<span>Dreams:</span>
						<div class="text-container" data-augmented-ui="tr-clip bl-clip  border">
							{character.dreams}
						</div>
					</div>
				</section>
			</div>
			<div class="lists-row" data-augmented-ui-reset>
				<div class="skills-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
					<h3 class="section-title">Skills</h3>
					<List data={skills} maxItems={-1}>
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
				<div class="items-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
					<h3 class="section-title">Items</h3>
					<List data={skills} maxItems={-1}>
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
				<div class="scripts-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
					<h3 class="section-title">Scripts</h3>
					<List data={skills} maxItems={-1}>
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
			</div>
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
		/* --aug-l-center: 38%; */
		--aug-l: 5px;
		--aug-r: 5px;
		/* var(--content-container-background); */
		/* --aug-bl2-height: 0.25rem;
		--aug-bl2-width: 0.25rem; */
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
	span {
		margin-left: 0.5rem;
	}
	.container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: 1fr;
		/* grid-template-rows: 0.5fr 0.2fr 0.3fr; */
		grid-template-rows: min-content min-content auto;
		gap: 0.5rem;
	}

	.section-container {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: stretch;
		justify-content: space-evenly;
		gap: 0.5rem;
	}
	.section-title {
		display: inline;
		position: absolute;
		/* top: -3.8rem; */
		font-size: 1rem;
		text-transform: lowercase;
		color: var(--fourth-accent);
		padding-inline: 2rem;
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
	.physical-stats {
		width: 100%;
		height: 100%;
		display: grid;
		margin-left: 0.25rem;
		align-content: start;
		gap: 1rem;
		white-space: nowrap;
		text-overflow: ellipsis;
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

	.hp > div,
	.ap > div {
		display: grid;
		place-content: center;
		overflow: visible;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
		padding: 2rem;
	}
	.hp h4,
	.ap h4 {
		position: relative;
		margin: 0;
	}
	.ap h4 {
		text-align: right;
	}
	.hp span {
		margin: 0;
	}
	.hp small {
		display: block;
		border-top: 1px solid var(--fourth-accent);
		font-size: 0.7rem;
	}

	.cyber-heading {
		grid-area: cyber-heading;
	}

	.cybernetics-container {
		grid-area: cyber-cell;
	}
	:global(.cybernetics-container .list) {
		--list-gap: 0.5rem;
		margin-block: 1rem;
	}

	:global(.cybernetics-container .list button) {
		--aug-border-bg: var(--menu-item-aug-border-bg);
		width: 100%;
		font-size: 0.65rem;
	}

	.profile-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: min-content 1fr;
		grid-auto-flow: row;
		grid-template-areas:
			'heading heading heading'
			'. . .';
		width: 100%;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
		padding-block: 1rem;
		padding-inline: 2rem;
		gap: 1.5rem;
		row-gap: 0.25rem;
		align-content: center;
	}

	.profile-heading {
		grid-area: heading;
	}

	.text-section span {
		display: block;
		margin-bottom: 0.5rem;
		margin-left: 0;
	}
	.text-container {
		display: grid;
		width: 100%;
		height: 7rem;
		padding: 0.5rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
		overflow-y: auto;
	}
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
		/* max-height: 22rem;
		overflow-y: scroll; */
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}
	.lists-row .section-title {
		display: flex;
		justify-content: center;
		width: 100%;
		position: relative;
		/* top: -2rem; */
		font-size: 1rem;
		text-transform: lowercase;
	}

	:global(.list) {
		--list-gap: 0.5rem;
	}

	:global(.list button),
	.lists-row button {
		--aug-border-bg: var(--menu-item-aug-border-bg);
		width: 100%;
	}

	:global(.list button) {
		font-size: 0.8rem;
	}

	@media (max-width: 768px) {
		.scroll-wrapper {
			overflow-y: auto;
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

		.profile-row {
			padding-top: 2rem;
			grid-template-columns: 1fr;
			grid-template-rows: min-content repeat(3, 1fr);
			grid-auto-flow: row;
			grid-template-areas:
				'heading'
				'.'
				'.'
				'.';
		}

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
