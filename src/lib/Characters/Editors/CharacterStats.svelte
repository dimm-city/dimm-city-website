<script lang="ts">
	import Input from '$lib/Components/Input.svelte';
	import ProfileImage from '$lib/Components/ProfileImage.svelte';
	import { Character } from '../Character';
	export let character: Character = new Character();
</script>

<style>
	.container {
		min-height: 100%;
		display: grid;
		grid-template-columns: 0.7fr 1.6fr;
		grid-template-rows: 0.5fr 0.5fr;
		gap: 1rem 1rem;
		grid-auto-flow: row;
		grid-template-areas:
			'image-area attributes-area'
			'description-area description-area';
	}

	.image-area {
		justify-self: center;
		align-self: center;
		grid-area: image-area;
		width: 100%;
		height: 100%;
	}

	.description-area {
		grid-area: description-area;
	}

	.attributes-area {
		grid-area: attributes-area;
	}

	.attributes {
		margin: 0 0.5rem;
		display: grid;
		grid-template-columns: 0.5fr 1fr;
		gap: 0.5rem;
	}
	.attributes div:nth-child(odd) {
		font-weight: bold;
		width: min-content;
		white-space: nowrap;
	}
</style>

<div class="container">
	<div class="image-area">
		<ProfileImage {character} />
	</div>
	<div class="attributes-area">
		<div class="attributes">
			<div>Name</div>
			<div><Input bind:value={character.name} /></div>
			<div>Pronouns:</div>
			<div><Input bind:value={character.pronouns} /></div>
			<div>Age</div>
			<div><Input type="number" min="1" max="200" bind:value={character.age} /></div>
			<div>Height (m)</div>
			<div><Input bind:value={character.height} type="number" step="0.5" min="0" max="100" /></div>
			<div>Weight (kg)</div>
			<div><Input type="number" min="0" max="100" bind:value={character.weight} /></div>
		</div>
	</div>
	<div class="description-area">
		<div class="attributes">
			<div>Eyes:</div>
			<div>{character.eyes ?? ''}</div>
			<div>Skin:</div>
			<div>{character.skin ?? ''}</div>
			<div>Hair:</div>
			<div>{character.hair ?? ''}</div>
		</div>
	</div>
</div>
