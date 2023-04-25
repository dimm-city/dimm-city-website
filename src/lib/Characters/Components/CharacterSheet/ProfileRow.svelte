<script>
	import TextSection from './TextSection.svelte';

	// @ts-nocheck

	import Input from '$lib/Shared/Components/Input.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';

	/**
	 * @type {import('$lib/Characters/Models/Character').ICharacter}}
	 */
	export let character;
	export let isEditing = false;
</script>

<div class="profile-row" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip border">
	<div class="profile-heading"><h3>Profile</h3></div>
	<section class="section-container profile">
		<div class="label">Origin:</div>
		<div class="value"><span>{character.currentLocation?.name ?? 'Unknown'}</span></div>

		<div class="label">Residency:</div>
		<div class="value">
			{#if isEditing}
				<span>[Location selector]</span>
			{:else}
				<span>{character.currentLocation?.name ?? 'Unknown'}</span>
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
	<div class="backstory">
		<TextSection header="Backstory" {isEditing} bind:data={character.backstory} />
	</div>
	<div class="dreams">
		<TextSection header="Dreams" {isEditing} bind:data={character.dreams} />
	</div>
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
	.section-container.profile {
		display: grid;
		grid-area: profile;
		grid-template-columns: min-content 1fr;
		grid-column-gap: 0.5rem;
	}
	.dreams {
		grid-area: dreams;
	}
	.backstory {
		grid-area: backstory;
	}
	.label {
		text-align: left;
		font-weight: bold;
	}

	.value {
		display: flex;
		text-align: left;
	}
	.profile-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: min-content 1fr;
		grid-auto-flow: row;
		grid-template-areas:
			'heading heading heading'
			'profile backstory dreams';
		width: 100%;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
		padding-block: 2rem;
		padding-inline: 1rem;
		gap: 1.5rem;
		row-gap: 0.25rem;
		align-content: center;
	}

	.profile-heading {
		grid-area: heading;
	}

	@media (max-width: 1199px) {
		.profile-row {
			padding-top: 2rem;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: min-content repeat(2, 1fr);
			grid-auto-flow: row;
			row-gap: 1rem;
			grid-template-areas:
				'heading heading'
				'profile profile'
				'backstory dreams';
		}
	}
	@media (max-width: 767px) {
		.profile-row {
			padding-top: 2rem;
			grid-template-columns: 1fr;
			grid-template-rows: min-content repeat(3, 1fr);
			grid-auto-flow: row;
			row-gap: 1rem;
			grid-template-areas:
				'heading'
				'profile'
				'backstory'
				'dreams';
		}
	}
		
</style>
