<script>
	import Input from '$lib/Shared/Components/Input.svelte';
	import { ages } from '$lib/Shared/Enums';
	import Select from 'svelte-select/Select.svelte';
	import { writable } from 'svelte/store';
	import { selectedCharacter } from './BuilderStore';

	/**
	 * character.attributes.height and character.attributes.weight are stored using metric values.
	 * this component lets users toggle between metric values and imperial values. However, the
	 * if the user updates the values, the component will update the character.attributes.height and character.attributes.weight values
	 * with the appropriate metric values.
	 *
	 * Place a button at the end of the input element for height and weight. The button should toggle between metric values and imperial values.
	 *
	 * Implement functions for updating the character.attributes.height and character.attributes.weight values with the correct metric values.
	 *
	 * The input elements can use a local variable to hold the displayed values for height and weight.
	 *
	 * When converting height, use inches in imperial and centimeters in metric.
	 * When converting weight, use pounds in imperial and kilograms in metric.
	 */
	let isMetric = writable(true);
	let tempHeight = writable($selectedCharacter?.attributes.height);
	tempHeight.subscribe((value) => {
		if ($isMetric) $selectedCharacter.attributes.height = value;
		else $selectedCharacter.attributes.height = Math.round(value * 2.54);
	});

	let tempWeight = writable($selectedCharacter.attributes.weight);
	tempWeight.subscribe((value) => {
		if ($isMetric) $selectedCharacter.attributes.weight = value;
		else $selectedCharacter.attributes.weight = Math.round(value / 0.45359237);
	});

	function toggleUnits() {
		isMetric.update((value) => !value);
		if ($isMetric) {
			$tempHeight = Math.round($tempHeight * 2.54);
			$tempWeight = Math.round($tempWeight / 0.45359237);
		} else {
			$tempHeight = Math.round($tempHeight / 2.54);
			$tempWeight = Math.round($tempWeight * 0.45359237);
		}
	}
</script>

<div class="physical-stats">
	<div class="grid-container">
		<div class="label">Race:</div>
		<div class="value">
			{#if $selectedCharacter?.attributes.race}
				<span>{$selectedCharacter.attributes.race.data?.attributes?.name}</span>
			{/if}
		</div>
		<div class="label">Eyes:</div>
		<div class="value"><span>{$selectedCharacter?.attributes.eyes || ''}</span></div>
		<div class="label">Skin:</div>
		<div class="value"><span>{$selectedCharacter?.attributes.skin || ''}</span></div>
		<div class="label">Age:</div>
		<div class="value aug-select">
			<Select
				value={$selectedCharacter?.attributes.age}
				bind:justValue={$selectedCharacter.attributes.age}
				items={ages}
			/>
		</div>
		<div class="label">Height:</div>
		<div class="value suffix">
			<Input bind:value={$tempHeight} class="inline" />
			<button title="toggle units" on:click={toggleUnits}>{$isMetric ? 'cm' : 'in'}</button>
		</div>
		<div class="label">Weight:</div>
		<div class="value suffix">
			<Input bind:value={$tempWeight} class="inline" />
			<button title="toggle units" on:click={toggleUnits}>{$isMetric ? 'kg' : 'lb'}</button>
		</div>
	</div>
	<!-- <ProfileEditor bind:character /> -->
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
	}
	.suffix button {
		width: 10ch;
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
			align-items: start;
			justify-content: start;
			display: flex;
		}
		.value {
			white-space: inherit;
		}
	}
</style>
