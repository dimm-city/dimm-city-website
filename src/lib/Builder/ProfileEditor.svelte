<script>
	import Select from 'svelte-select';
	import { getDistricts } from '$lib/Shared/Stores/getDistricts';
	import { getSpecialties } from '$lib/Shared/Stores/getSpecialties';
	import { flaws, ideals, vibes } from '$lib/Shared/Enums';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { selectedCharacter } from './BuilderStore.js';
</script>

<ContentPane scrollable={true} padding={3}>
	<div class="profile-row">
		{#if $selectedCharacter == null}
			<div>No character selected</div>
		{:else}
			<section class="section-container profile">
				<div class="label">Specialties:</div>
				<div class="value aug-select">
					<Select
						loadOptions={getSpecialties}
						placeholder="Select up to two specialties"
						label="name"
						itemId="id"
						multiple={true}
						hideEmptyState={true}
						bind:value={$selectedCharacter.attributes.specialties.data}
					>
						<div slot="selection" let:selection>
							<span>{selection.name ?? selection.attributes?.name ?? 'Unknown'}</span>
						</div>
						<div slot="item" let:item let:index>
							<span>{item.name ?? item.attributes?.name ?? 'Unknown'}</span>
						</div>
					</Select>
				</div>

				<div class="label">Ideal:</div>
				<div class="value aug-select">
					<Select
						value={$selectedCharacter.attributes.ideal}
						bind:justValue={$selectedCharacter.attributes.ideal}
						items={ideals}
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
							bind:justValue={$selectedCharacter.attributes.currentLocation}
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
						value={$selectedCharacter.attributes.vibes}
						bind:justValue={$selectedCharacter.attributes.vibes}
						items={vibes}
					/>
				</div>

				<div class="label">Origin:</div>
				<div class="value">
					<div class="current-location aug-select">
						<Select
							loadOptions={getDistricts}
							placeholder="Select a district"
							label="name"
							itemId="id"
							bind:justValue={$selectedCharacter.attributes.originLocation}
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
						value={$selectedCharacter.attributes.flaw}
						bind:justValue={$selectedCharacter.attributes.flaw}
						items={flaws}
					/>
				</div>
			</section>
		{/if}
	</div>
</ContentPane>

<style>
	.profile-row {
		position: relative;
		width: 100%;

		padding-block: 2rem;
		padding-inline: 1rem;
		gap: 1.5rem;
		row-gap: 0.25rem;
		align-content: center;
	}

	:global(.aug-select) {
		--multi-item-clear-icon-color: var(--pink);
		--multi-item-outline: 1px solid var(--pink);
		--clear-select-color: var(--pink);
	}
	.section-container.profile {
		display: grid;
		grid-area: profile;
		grid-template-columns: min-content 1fr min-content 1fr;
		grid-template-rows: repeat(auto-fill, min-content);
		grid-column-gap: 1rem;
		grid-row-gap: 2rem;
		grid-auto-flow: row;
		max-height: 100%;
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

	@media screen and (max-width: 767px) {
		.section-container.profile {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(auto-fill, min-content);
			grid-row-gap: 1rem;
		}
		.label,
		.value {
			width: 100%;
		}
	}
</style>
