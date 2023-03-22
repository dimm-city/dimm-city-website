<!-- CharacterSheet.svelte -->
<script lang="ts">
	import { openModal } from 'svelte-modals';
	import AbilityModal from './Components/AbilityModal.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import List from '$lib/Shared/Components/List.svelte';
	import ListItem from '../../routes/system-map/ListItem.svelte';
	import { specialties } from '$lib/Specialties/SpecialtyStore';

	export let character: ICharacter;

	function viewAbility(ability: any) {
		openModal(AbilityModal, { data: ability });
	}
</script>

<div
	class="sheet"
	data-augmented-ui="bl-clip-inset br-clip-inset tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip both"
>
	<div class="heading">
		<h1>
			Name: {character.name}
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
			<div class="stats-container">
				<h3 class="section-title">Physical Stats</h3>
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
				<List />
			</div>
		</div>
		<div class="profile-row" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip border">
			<section class="section-container">
				<h3 class="section-title">Profile</h3>
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
			</section>
			<section class="section-container">
				<div>
					Origin:<span>{character.currentLocation?.name ?? 'Unknown'} </span>
				</div>
				<div>
					Backstory:
					<div class="text-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
						{character.backstory}
					</div>
				</div>
			</section>
			<section class="section-container">
				<div>
					Current District:<span>{character.currentLocation?.name ?? 'Unknown'} </span>
				</div>
				<div>
					Dreams:
					<div class="text-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
						{character.dreams}
					</div>
				</div>
			</section>
		</div>
		<div class="lists-row">
			<div class="skills-container">
				<h3 class="section-title">Skills</h3>
				<List />
			</div>
			<div class="items-container">
				<h3 class="section-title">Items</h3>
				<List />
			</div>
			<div class="scripts-container">
				<h3 class="section-title">Scripts</h3>
				<List />
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
		width: 100%;
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
	span{
		margin-left: 0.5rem;
	}
	.container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 0.7fr 0.7fr 1.6fr;
		gap: 1.5rem;
		grid-auto-flow: row;
	}

	.section-container{
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: stretch;
		gap: 0.5rem;
	}
	.section-title {
		display: inline;
		position: absolute;
		top: -2.5rem;
		font-size: 1rem;
		text-transform: lowercase;
		color: var(--fourth-accent);
	}
	.stats-row {
		display: grid;
		grid-template-columns: 1.25fr 0.5fr 1.25fr;
		padding: 1rem;
		padding-top: 2.5rem;
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
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}
	.physical-stats {
		width: 100%;
		height: 100%;
		display: grid;
		margin-left: 0.2rem;
		gap: 0.2rem;
	}

	.scores-container {
		display: grid;
		flex-direction: column;
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
	}

	.profile-row,
	.lists-row {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
	}

	.profile-row {
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
		padding: 1rem;
		padding-top: 2.5rem;
		gap: 1rem;
	}
	.text-container{
		display: grid;
		min-height: 3rem;
		width: 100%;
		height: 100%;
		padding: 0.33rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
	}
	.lists-row > div {
		position: relative;
		text-align: center;
	}
	.lists-row .section-title {
		display: flex;
		justify-content: center;
		width: 100%;
		position: absolute;
		top: -2rem;
		font-size: 1rem;
		text-transform: lowercase;
	}

	@media (max-width: 768px) {
		.container {
			grid-template-rows: auto;
		}
		.stats-row {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, 1fr);
		}
		.lists-row,
		.profile-row {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, 1fr);
		}
	}


</style>
