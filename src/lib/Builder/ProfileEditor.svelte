<script>
	import Select from 'svelte-select';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	import { getDistricts } from '$lib/Shared/Stores/getDistricts';
	import { getSpecialties } from '$lib/Shared/Stores/getSpecialties';
	import { formatCharacterSpecialties } from '$lib/Shared/FormatFunctions';

	/**
	 * @type {DC.Character}
	 */
	export let character;

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

		<div class="label">Beliefs:</div>
		<div class="value">
			<Textarea maxlength="150" bind:value={character.attributes.beliefs} />
		</div>

		<div class="label">Residency:</div>
		<div class="value">
			<div class="current-location aug-select">
				<Select
					loadOptions={getDistricts}
					placeholder="Select a district"
					label="name"
					itemId="id"
					--list-z-index="8888888"
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
		<div class="value">
			<Textarea maxlength="150" bind:value={character.attributes.flaws} />
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
	.profile-heading {
		grid-area: heading;
	}

	.current-location {
		display: flex;
		width: 100%;
		color: var(--third-accent);
		font-family: var(--main-font-family);
	}

	@media screen and (max-width: 767px) {
		.section-container.profile {
			grid-template-columns: min-content 1fr;
			grid-template-rows: repeat(8, min-content);
		}
		.label{
			align-items: start;
		}
	}
</style>
