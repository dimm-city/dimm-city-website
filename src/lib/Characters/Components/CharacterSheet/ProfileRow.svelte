<script>
	//@ts-nocheck
	import Select from 'svelte-select';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	import { getDistricts } from '$lib/Locations/getDistricts';
	import { getSpecialties } from '$lib/Specialties/getSpecialties';

	/**
	 * @type {import('$lib/Characters/Models/Character').ICharacter}}
	 */
	export let character;
	export let isEditing = false;
</script>

<div class="profile-row">
	<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip border" />
	<div class="profile-heading"><h3>Profile</h3></div>
	<section class="section-container profile">
		<div class="label">Specialties:</div>
		<div class="value">
			{#if isEditing}
				<div class="aug-select">
					<Select
						loadOptions={getSpecialties}
						placeholder="Select up to two specialties"
						label="name"
						itemId="id"
						multiple={true}
						hideEmptyState={true}
						bind:value={character.specialties.data}
					>
						<div slot="selection" let:selection>
							<span>{selection.name ?? selection.attributes?.name ?? 'Unknown'}</span>
						</div>
						<div slot="item" let:item let:index>
							<span>{item.name ?? item.attributes?.name ?? 'Unknown'}</span>
						</div>
					</Select>
				</div>
			{:else}
				<span
					>{character.specialties?.data?.length > 0
						? character.specialties?.data?.map((s) => s.attributes?.name).join(', ')
						: 'Unknown'}</span
				>
			{/if}
		</div>
		<div class="label">Origin:</div>
		<div class="value">
			{#if isEditing}
				<div class="current-location aug-select">
					<Select
						loadOptions={getDistricts}
						placeholder="Select a district"
						label="name"
						itemId="id"
						bind:value={character.originLocation.data}
					>
						<div slot="selection" let:selection>
							<span>{selection.name ?? selection.attributes?.name ?? 'Unknown'}</span>
						</div>
						<div slot="item" let:item let:index>
							<span>{item.name ?? item.attributes?.name ?? 'Unknown'}</span>
						</div>
					</Select>
				</div>
			{:else}
				<span>{character.originLocation?.data?.attributes?.name ?? 'Unknown'}</span>
			{/if}
		</div>

		<div class="label">Residency:</div>
		<div class="value">
			{#if isEditing}
				<div class="current-location aug-select">
					<Select
						loadOptions={getDistricts}
						placeholder="Select a district"
						label="name"
						itemId="id"
						--list-z-index="8888888"
						bind:value={character.currentLocation.data}
					>
						<div slot="selection" let:selection>
							<span>{selection.name ?? selection.attributes?.name ?? 'Unknown'}</span>
						</div>
						<div slot="item" let:item let:index>
							<span>{item.name ?? item.attributes?.name ?? 'Unknown'}</span>
						</div>
					</Select>
				</div>
			{:else}
				<span>{character.currentLocation?.data?.attributes?.name ?? 'Unknown'}</span>
			{/if}
		</div>

		<div class="label">Vibe:</div>
		<div class="value">
			{#if isEditing}
				<Input bind:value={character.vibe} maxlength="50" class="inline" />
			{:else}
				<span>{character.vibe}</span>
			{/if}
		</div>

		<div class="label">Beliefs:</div>
		<div class="value">
			{#if isEditing}
				<Textarea maxlength="150" bind:value={character.beliefs} />
			{:else}
				<span>{character.beliefs ?? 'Unknown'}</span>
			{/if}
		</div>

		<div class="label">Flaws:</div>
		<div class="value">
			{#if isEditing}
				<Textarea maxlength="150" bind:value={character.flaws} />
			{:else}
				<span>{character.flaws ?? 'Unknown'}</span>
			{/if}
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
		--aug-inlay: 0;
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

	@media (max-width: 767px) {
		.section-container.profile {
			grid-template-columns: min-content 1fr;
			grid-template-rows: repeat(8, min-content);
		}
	}
</style>
