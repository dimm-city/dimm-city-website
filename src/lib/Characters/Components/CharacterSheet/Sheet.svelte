<!-- CharacterSheet.svelte -->
<script lang="ts">
	import { openModal } from 'svelte-modals';
	import AbilityModal from '../AbilityModal.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import List from '$lib/Shared/Components/List.svelte';
	import { specialties } from '$lib/Specialties/SpecialtyStore';
	import ListItemLink from '$lib/Shared/Components/ListItemLink.svelte';

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

<div
	class="sheet"
	data-augmented-ui="bl-2-clip-y br-2-clip-y tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip both"
>
	<div class="heading">
		<h1>
			{character.name}
		</h1>
		<div>
			<button class="aug-button">menu</button>
		</div>
		<h2>
			Specialty: {character.specialties?.data?.length > 0
				? character.specialties?.data.join(', ')
				: 'Unknown'}
		</h2>
	</div>
	<div class="container">
		<div class="stats-row" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both">
			<h3 class="section-title">Physical Stats</h3>
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
				<div data-augmented-ui="all-hex border" class="hp"><span>10</span><small>/10</small></div>
				<div data-augmented-ui="all-hex border" class="ap">10</div>
			</div>
			<div class="cybernetics-container">
				<h3 class="section-title">Cybernetics</h3>
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
			<h3 class="section-title">Profile</h3>
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
					<div class="text-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
						{character.backstory}
					</div>
				</div>
			</section>
			<section class="section-container">
				<div class="text-section">
					<span>Dreams:</span>
					<div class="text-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
						{character.dreams}
					</div>
				</div>
			</section>
		</div>
		<div class="lists-row">
			<h3 class="section-title">Skills</h3>
			<h3 class="section-title">Items</h3>
			<h3 class="section-title">Scripts</h3>
			<div class="skills-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
				<List data={skills} maxItems={-1}>
					<div let:item slot="item">
						<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
							>{item.attributes.name}</button
						>
					</div>
				</List>
			</div>
			<div class="items-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
				<List data={skills} maxItems={-1}>
					<div let:item slot="item">
						<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
							>{item.attributes.name}</button
						>
					</div>
				</List>
			</div>
			<div class="scripts-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
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

<style>
	.sheet {
		position: relative;
		border: 0;
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
		display: flex;
		width: 100%;
		padding-inline: 1.5rem;
		padding-block: 0.5rem;
		justify-content: space-between;
		align-items: end;
		color: var(--fourth-accent);
	}
	h1 {
		font-size: 1.5rem;
		margin: 0;
		padding-inline: 0.25rem;
		display: inline;
	}
	h2 {
		margin: 0;
		display: inline;
		font-size: 0.8rem;
		padding-left: 0.5rem;
	}
	h3 {
		margin: 0;
	}
	span {
		margin-left: 0.5rem;
	}
	.container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 0.2fr 0.6fr 0.2fr;
		gap: 0.5rem;
		grid-auto-flow: row;
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
		grid-template-columns: 1fr 0.75fr 1fr;
		padding: 1rem;
		padding-top: 1rem;
		padding-bottom: 0.25rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
	}

	.stats-container {
		position: relative;
		display: flex;
		flex-direction: row;
	}
	.image {
		padding: 0.5rem;
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
		align-content: space-around;
	}

	.scores-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}

	.hp,
	.ap {
		display: grid;
		padding: 2rem;
		place-content: center;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}

	.cybernetics-container {
		position: relative;
		padding: 0.5rem;
	}
	:global(.cybernetics-container .list) {
		--list-gap: 0.25rem;
	}

	:global(.cybernetics-container .list button) {
		--aug-border-bg: var(--menu-item-aug-border-bg);
		width: 100%;
		font-size: 0.65rem;
	}

	.profile-row {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
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
		align-content: center;
	}
	.text-section span {
		display: block;
		margin-bottom: 0.5rem;
	}
	.text-container {
		display: grid;
		width: 100%;
		height: 8rem;
		padding: 0.5rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
	}
	.lists-row {
		position: relative;
		display: grid;
		grid-template-rows: min-content auto;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.33rem;
		row-gap: 0;
		margin-inline: 0.5rem;
	}
	.lists-row > div {
		position: relative;
		text-align: center;
		padding-inline: 0.75rem;
		max-height: 22rem;
		overflow-y: scroll;
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
		.sheet {
			--aug-border-all: 3px;
			--aug-border-bg: transparent;
			--aug-tl: 3px;
			--aug-tr: 3px;
			--aug-t-center: 50%;
			--aug-t: 5px;
			--aug-inlay-bg: transparent;
			--aug-l: 0px;
			--aug-r: 0px;
			overflow-y: auto;
			overflow-x: hidden;			
		}
		.container {
			grid-template-rows: auto;
		}
		.stats-row {
			grid-template-columns: 1fr 0.2fr;
			grid-template-rows: 1fr 0.5fr min-content;
		}
		.scores-container {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
		}
		.cybernetics-container{
			grid-column-start: 1;
			grid-column-end: none;
			grid-row-start: 2;
		}
		.lists-row,
		.profile-row {
			padding-top: 2rem;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, 1fr);
		}
		.lists-row > div {
			position: relative;
			text-align: center;
			padding-inline: 0.75rem;
			overflow-y: auto;
			max-height: max-content;
			--aug-border-all: 2px;
			--aug-border-bg: var(--fourth-accent);
		}
	}
</style>
