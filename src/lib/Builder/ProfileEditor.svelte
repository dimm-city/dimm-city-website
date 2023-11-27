<script>
	import Select from 'svelte-select';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	import { getDistricts } from '$lib/Shared/Stores/getDistricts';
	import { getSpecialties } from '$lib/Shared/Stores/getSpecialties';

	/**
	 * @type {DC.Character}
	 */
	export let character;
	const flaws = [
		{ id: 'fearful', name: 'Fearful' },
		{ id: 'paranoia', name: 'Paranoia' },
		{ id: 'megalomaniac', name: 'Megalomaniac' },
		{ id: 'addictive-personality', name: 'Addictive Personality' },
		{ id: 'foolish', name: 'Foolish' },
		{ id: 'impulsive', name: 'Impulsive' },
		{ id: 'impish', name: 'Impish' },
		{ id: 'socially-awkward', name: 'Socially Awkward' },
		{ id: 'oblivious', name: 'Oblivious' },
		{ id: 'cold-hearted', name: 'Cold-hearted' },
		{ id: 'thief', name: 'Thief' },
		{ id: 'control-freak', name: 'Control Freak' },
		{ id: 'hedonist', name: 'Hedonist' },
		{ id: 'technophile', name: 'Technophile' },
		{ id: 'liar', name: 'Liar' },
		{ id: 'cynic', name: 'Cynic' },
		{ id: 'reckless', name: 'Reckless' },
		{ id: 'solipsist', name: 'Solipsist' },
		{ id: 'wrathful', name: 'Wrathful' },
		{ id: 'fatalistic', name: 'Fatalistic' },
		{ id: 'vain', name: 'Vain' },
		{ id: 'nihilist', name: 'Nihilist' }
	];

	const ideals = [
		{ id: 'individualism', name: 'Individualism' },
		{ id: 'generosity', name: 'Generosity' },
		{ id: 'anti-establishment', name: 'Anti-establishment' },
		{ id: 'anti-technology', name: 'Anti-technology' },
		{ id: 'pragmatism', name: 'Pragmatism' },
		{ id: 'pleasure', name: 'Pleasure' },
		{ id: 'technological-adaptation', name: 'Technological Adaptation' },
		{ id: 'honor', name: 'Honor' },
		{ id: 'information-freedom', name: 'Information Freedom' },
		{ id: 'salvation', name: 'Salvation' },
		{ id: 'empathy-for-the-marginalized', name: 'Empathy for the Marginalized' },
		{ id: 'power', name: 'Power' },
		{ id: 'survival-and-adaptability', name: 'Survival and Adaptability' },
		{ id: 'the-ends', name: 'The Ends' },
		{ id: 'transmortalism', name: 'Transmortalism' },
		{ id: 'order', name: 'Order' },
		{ id: 'justice', name: 'Justice' },
		{ id: 'heroism', name: 'Heroism' },
		{ id: 'compassion', name: 'Compassion' }
	];

	const vibes = [
		{ id: 'long-shadow', name: 'Long shadow' },
		{ id: 'sleepy-mood', name: 'Sleepy mood' },
		{ id: 'street-smart', name: 'Street-smart' },
		{ id: 'outcast-mannerisms', name: 'Outcast mannerisms' },
		{ id: 'permanent-grimace', name: 'Permanent grimace' },
		{ id: 'corporate-air', name: 'Corporate air' },
		{ id: 'bursting-energy', name: 'Bursting energy' },
		{ id: 'mysterious-aspect', name: 'Mysterious aspect' },
		{ id: 'gentle-disposition', name: 'Gentle disposition' },
		{ id: 'androgynous-mien', name: 'Androgynous mien' },
		{ id: 'thousand-yard-stare', name: 'Thousand-yard stare' },
		{ id: 'high-strung', name: 'High-strung' },
		{ id: 'brooding-presence', name: 'Brooding presence' },
		{ id: 'friendly-demeanor', name: 'Friendly demeanor' },
		{ id: 'meandering-gaze', name: 'Meandering gaze' },
		{ id: 'graceful-carriage', name: 'Graceful carriage' },
		{ id: 'captivating-grin', name: 'Captivating grin' },
		{ id: 'raucous-laugh', name: 'Raucous laugh' },
		{ id: 'flawless-poise', name: 'Flawless poise' },
		{ id: 'fiery-temper', name: 'Fiery temper' },
		{ id: 'menacing-aura', name: 'Menacing aura' }
	];
</script>

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
				items={ideals}
				placeholder="Select an ideal"
				label="name"
				itemId="id"
				bind:justValue={character.attributes.beliefs}
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
		<div class="value">
			<Input bind:value={character.attributes.vibe} maxlength="50" class="inline" />
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

		<div class="label">Flaws:</div>
		<div class="value aug-select">
			<Select
				items={flaws}
				placeholder="Select an flaw"
				label="name"
				itemId="id"
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
			grid-template-columns: min-content 1fr;
			grid-template-rows: repeat(8, min-content);
		}
		.label {
			align-items: start;
		}
	}
</style>
