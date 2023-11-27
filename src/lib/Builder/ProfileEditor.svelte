<script>
	import Select from 'svelte-select';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	import { getDistricts } from '$lib/Shared/Stores/getDistricts';
	import { getSpecialties } from '$lib/Shared/Stores/getSpecialties';
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log('character', character);
	});
	/**
	 * @type {DC.Character}
	 */
	export let character;

	const ageOptions = [
		'Childhood',
		'Adolescence',
		'Young Adulthood',
		'Adulthood',
		'Middle-Age',
		'Old Age',
		'Ancient'
	];

	const flaws = [
		'Fearful',
		'Paranoia',
		'Megalomaniac',
		'Addictive Personality',
		'Foolish',
		'Impulsive',
		'Impish',
		'Socially Awkward',
		'Oblivious',
		'Cold-hearted',
		'Thief',
		'Control Freak',
		'Hedonist',
		'Technophile',
		'Liar',
		'Cynic',
		'Reckless',
		'Solipsist',
		'Wrathful',
		'Fatalistic',
		'Vain',
		'Nihilist'
	];

	const ideals = [
		'Individualism',
		'Generosity',
		'Anti-establishment',
		'Anti-technology',
		'Pragmatism',
		'Pleasure',
		'Technological Adaptation',
		'Honor',
		'Information Freedom',
		'Salvation',
		'Empathy for the Marginalized',
		'Power',
		'Survival and Adaptability',
		'The Ends',
		'Transmortalism',
		'Order',
		'Justice',
		'Heroism',
		'Compassion'
	];

	const vibes = [
		'Long shadow',
		'Sleepy mood',
		'Street-smart',
		'Outcast mannerisms',
		'Permanent grimace',
		'Corporate air',
		'Bursting energy',
		'Mysterious aspect',
		'Gentle disposition',
		'Androgynous mien',
		'Thousand-yard stare',
		'High-strung',
		'Brooding presence',
		'Friendly demeanor',
		'Meandering gaze',
		'Graceful carriage',
		'Captivating grin',
		'Raucous laugh',
		'Flawless poise',
		'Fiery temper',
		'Menacing aura'
	];

	
	async function setVibeItem() {
		const vibesList = vibes.map((item) => ({ id: item, name: item }));
		character.attributes.vibeItem = vibesList.find((v) => v.name == character.attributes.vibe);
		return vibesList;
	}

	async function setFlawItem() {
		const flawsList = flaws.map((item) => ({ id: item, name: item }));
		character.attributes.flawItem = flawsList.find((v) => v.name == character.attributes.flaw);
		return flawsList;
	}

	async function setIdealItem() {
		const idealsList = ideals.map((item) => ({ id: item, name: item }));
		character.attributes.idealItem = idealsList.find((v) => v.name == character.attributes.ideal);
		return idealsList;

	}
</script>

<div class="grid-container">
	<div class="label">Race:</div>
	<div class="value">
		{#if character.attributes.race}
			<span>{character.attributes.race.data?.attributes?.name}</span>
		{/if}
	</div>
	<div class="label">Pronouns:</div>
	<div class="value">
		<Input bind:value={character.attributes.pronouns} class="inline" maxlength="50" />
	</div>
	<div class="label">Age:</div>
	<div class="value aug-select">
		<Select
			value={character.attributes.age}
			bind:justValue={character.attributes.age}
			items={ageOptions}
		/>
	</div>
	<div class="label">Height:</div>
	<div class="value suffix">
		<Input bind:value={character.attributes.height} class="inline" />

		<!-- <span>cm</span> -->
	</div>
	<div class="label">Weight:</div>
	<div class="value suffix">
		<Input bind:value={character.attributes.weight} class="inline" />

		<!-- <span>kg</span> -->
	</div>
	<div class="label">Eyes:</div>
	<div class="value"><span>{character.attributes.eyes || ''}</span></div>
	<div class="label">Skin:</div>
	<div class="value"><span>{character.attributes.skin || ''}</span></div>
</div>
<div class="profile-row">
	<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both" />
	<section class="section-container profile">
		<div class="label">Specialties:</div>
		<div class="value">
			<div class="aug-select">
				<Select
					loadOptions={getSpecialties}
					placeholder="Select up to two specialties"
					label="name"
					itemId="id"
					multiple={true}
					hideEmptyState={true}
					bind:value={character.attributes.specialties.data}
				>
					<div slot="selection" let:selection>
						<span>{selection.name ?? selection.attributes?.name ?? 'Unknown'}</span>
					</div>
					<div slot="item" let:item let:index>
						<span>{item.name ?? item.attributes?.name ?? 'Unknown'}</span>
					</div>
				</Select>
			</div>
		</div>

		<div class="label">Ideal:</div>
		<div class="value aug-select">
			<Select	
				loadOptions={()=> setIdealItem()}	
				placeholder="Select an ideal"
				itemId="id"
				label="name"
				bind:value={character.attributes.idealItem}
				bind:justValue={character.attributes.ideal}
			/>
		</div>

		<div class="label">Residency:</div>
		<div class="value">
			<div class="current-location aug-select">
				<Select
					loadOptions={getDistricts}
					placeholder="Select a district"
					label="name"
					itemId="id"
					bind:justValue={character.attributes.currentLocation}
				>
					<div slot="selection" let:selection>
						<span>{selection.name ?? selection.attributes?.name ?? ''}</span>
					</div>
					<div slot="item" let:item let:index>
						<span>{item.name ?? item.attributes?.name ?? ''}</span>
					</div>
				</Select>
			</div>
		</div>
		<div class="label">Vibe:</div>
		<div class="value aug-select">
			<Select	
				loadOptions={()=> setVibeItem()}	
				placeholder="Select an vibe"
				itemId="id"
				label="name"
				bind:value={character.attributes.vibeItem}
				bind:justValue={character.attributes.vibe}
			/>
			<!-- <Input value={JSON.stringify(character.attributes.vibe)} maxlength="50" class="inline" /> -->
		</div>
		<div class="label">Origin:</div>
		<div class="value">
			<div class="current-location aug-select">
				<Select
					loadOptions={getDistricts}
					placeholder="Select a district"
					label="name"
					itemId="id"
					bind:justValue={character.attributes.originLocation}
				>
					<div slot="selection" let:selection>
						<span>{selection.name ?? selection.attributes?.name ?? ''}</span>
					</div>
					<div slot="item" let:item let:index>
						<span>{item.name ?? item.attributes?.name ?? ''}</span>
					</div>
				</Select>
			</div>
		</div>

		<div class="label">Flaw:</div>
		<div class="value aug-select">
			<Select	
				loadOptions={()=> setFlawItem()}	
				placeholder="Select an vibe"
				itemId="id"
				label="name"
				bind:value={character.attributes.flawItem}
				bind:justValue={character.attributes.flaw}
			/>
		</div>
	</section>
</div>

<style>
	h3 {
		margin: 0;
		color: var(--fourth-accent);
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

	:global(.aug-select) {
		--multi-item-clear-icon-color: var(--pink);
		--multi-item-outline: 1px solid var(--pink);
		--clear-select-color: var(--pink);
		--list-z-index: 999;
	}
	.section-container.profile {
		display: grid;
		grid-area: profile;
		grid-template-columns: min-content 1fr min-content 1fr;
		grid-template-rows: repeat(4, min-content);
		grid-column-gap: 0.5rem;
		grid-auto-flow: row;
	}
	.label {
		text-align: left;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.value {
		display: flex;
		text-align: left;
	}
	.profile-row {
		position: relative;
		width: 100%;

		padding-block: 2rem;
		padding-inline: 1rem;
		gap: 1.5rem;
		row-gap: 0.25rem;
		align-content: center;
	}

	.row-frame {
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

	@media screen and (max-width: 767px) {
		.section-container.profile {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(16, min-content);
		}
		.label, .value {
			width: 100%;
		}
	}
</style>
