<script lang="ts">
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Select from 'svelte-select/Select.svelte';
	export let character: ICharacter;
	export let isEditing = false;
	const ageOptions = [
		'Childhood',
		'Adolescence',
		'Young Adulthood',
		'Adulthood',
		'Middle-Age',
		'Old Age',
		'Ancient'
	];
</script>

<div class="physical-stats">
	<div class="grid-container">
		<div class="label">Race:</div>
		<div class="value">
			{#if character.race}
				{character.race.data?.attributes?.name}
			{/if}
		</div>
		<div class="label">Pronouns:</div>
		<div class="value">
			{#if isEditing}
				<Input bind:value={character.pronouns} class="inline" maxlength="50" />
			{:else}
				{character.pronouns || 'they/them'}
			{/if}
		</div>
		<div class="label">Age:</div>
		<div class="value aug-select">
			{#if isEditing}
				<Select bind:value={character.age} bind:justValue={character.age} items={ageOptions} />
			{:else}
				{character.age || 'Unknown'}
			{/if}
		</div>
		<div class="label">Height:</div>
		<div class="value suffix">
				{#if isEditing}
					<Input bind:value={character.height} class="inline" />
				{:else}
					{character.height || 0}
				{/if} cm
		</div>
		<div class="label">Weight:</div>
		<div class="value suffix">

			{#if isEditing}
				<Input bind:value={character.weight} class="inline" />
			{:else}
				{character.weight || 0}
			{/if}kg
		</div>
		<div class="label">Eyes:</div>
		<div class="value">{character.eyes || ''}</div>
		<div class="label">Skin:</div>
		<div class="value">{character.skin || ''}</div>
	</div>
</div>

<style>
	.physical-stats {
		width: 100%;
		height: 100%;
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	.grid-container {
		display: grid;
		grid-template-columns: min-content auto;
		gap: 1rem;
	}

	.label {
		text-align: right;
		margin-right: 0.5rem;
		font-weight: bold;
		align-items: center;
		justify-content: start;
		display: flex;
	}

	.value {
		white-space: nowrap;
		margin-left: 0.25rem;
		text-transform: capitalize;
	}

	.value.suffix {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		width: 100%;
	}

	:global(input.inline) {
		display: inline;
	}
	@media (max-width: 767px) {
		.physical-stats {
			padding-bottom: 2rem;
		}
		.grid-container {
			grid-template-columns: min-content auto;
		}
		.label {
			align-items: center;
			justify-content: start;
			display: flex;
		}
	}
</style>
