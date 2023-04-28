<script>
	import TextSection from './TextSection.svelte';
	import Select from 'svelte-select';

	// @ts-nocheck

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

<div class="story-row">
	<div class="backstory">
		<TextSection header="Backstory" {isEditing} bind:data={character.backstory} />
	</div>
	<div class="dreams">
		<TextSection header="Dreams" {isEditing} bind:data={character.dreams} />
	</div>
</div>

<style>
	.story-row {
		padding: 1rem;
		display: flex;
		width: 100%;
		column-gap: 3rem;
	}
	.dreams {
		width: 100%;
	}
	.backstory {
		width: 100%;
	}

	@media (max-width: 1024px) {
		.story-row {
			flex-wrap: wrap;
            row-gap: 2rem;
		}
	}
</style>
