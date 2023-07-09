<script>
	import Input from '$lib/Shared/Components/Input.svelte';
	import Select from 'svelte-select/Select.svelte';

	/**
	 * @type {DC.Character}
	 */
	export let character;
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
			{#if character.attributes.race}
				{character.attributes.race.data?.attributes?.name}
			{/if}
		</div>
		<div class="label">Pronouns:</div>
		<div class="value">
			{#if isEditing}
				<Input bind:value={character.attributes.pronouns} class="inline" maxlength="50" />
			{:else}
				{character.attributes.pronouns || 'they/them'}
			{/if}
		</div>
		<div class="label">Age:</div>
		<div class="value aug-select">
			{#if isEditing}
				<Select
					value={character.attributes.age}
					bind:justValue={character.attributes.age}
					items={ageOptions}
				/>
			{:else}
				{character.attributes.age || 'Unknown'}
			{/if}
		</div>
		<div class="label">Height:</div>
		<div class="value suffix">
			{#if isEditing}
				<Input bind:value={character.attributes.height} class="inline" />
			{:else}
				{character.attributes.height || 0}
			{/if} cm
		</div>
		<div class="label">Weight:</div>
		<div class="value suffix">
			{#if isEditing}
				<Input bind:value={character.attributes.weight} class="inline" />
			{:else}
				{character.attributes.weight || 0}
			{/if}kg
		</div>
		<div class="label">Eyes:</div>
		<div class="value">{character.attributes.eyes || ''}</div>
		<div class="label">Skin:</div>
		<div class="value">{character.attributes.skin || ''}</div>
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
