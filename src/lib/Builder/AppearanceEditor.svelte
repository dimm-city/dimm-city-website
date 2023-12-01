<!--
Implement a new svelte component based on the StatsRow.svelte component. However this component should remove the cybernetics section
and make the image more prominent in the row.

It should also allow editing Age, Height, and Weight. The code for this can be found the in the src/lib/Builder/ProfileEditor.svelteHTML.
Also include the ability to toggle between metric and imperial units for the editing of the  Height, and Weight. Toggling the unit should update
the displayed value for the given stat. However the actual value should always be stored in metric units.

--><script>
	import PhysicalStats from '../Characters/Components/CharacterSheet/PhysicalStats.svelte';
	import ProfileImage from '../Characters/Components/CharacterSheet/ProfileImage.svelte';
	import { openModal } from 'svelte-modals';
	import AbilityModal from '$lib/Abilities/AbilityModal.svelte';
	import { writable } from 'svelte/store';

	/**
	 * @type {DC.Character}
	 */
	export let character;
	export let isEditing = false;

	const viewAbility = (/** @type {DC.Ability} */ ability) =>
		openModal(AbilityModal, { data: ability });

	let isMetric = writable(true);

	function toggleUnits() {
		isMetric.update(value => !value);
	}

	function convertToImperial(value) {
		// Conversion logic here
	}

	function convertToMetric(value) {
		// Conversion logic here
	}
</script>

<div class="stats-row row-frame" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both">
	<div class="image-cell">
		<div class="image">
			<ProfileImage {character} />
		</div>
	</div>
	<div class="stats-container">
		<PhysicalStats {character} {isEditing} />
	</div>
</div>

<style>
	// Styles here
</style>
