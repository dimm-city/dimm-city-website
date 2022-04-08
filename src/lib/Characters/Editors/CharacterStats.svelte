<script lang="ts">
	import Input from '$lib/Components/Input.svelte';
	import ProfileImage from '$lib/Components/ProfileImage.svelte';
	import { Character } from '../Character';
	export let character: Character = new Character();
	export let readonly = true;
</script>

<style>
	.container {
		width: 100%;
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
			<div><Input bind:value={character.name}  disabled={readonly}/></div>
			<div>Pronouns:</div>
			<div><Input bind:value={character.pronouns}   disabled={readonly}/></div>
			<div>Age</div>
			<div><Input type="number" required min="1" max="200" bind:value={character.age}   disabled={readonly}/></div>
			<div>Height (m)</div>
			<div><Input bind:value={character.height} required type="number" step="0.5" min="0" max="100"   disabled={readonly}/></div>
			<div>Weight (kg)</div>
			<div><Input type="number" required min="0" max="100" bind:value={character.weight} disabled={readonly}/></div>
			<div>Eyes:</div>
			<div><Input bind:value={character.eyes}   disabled={readonly}/></div>
			<div>Skin:</div>
			<div><Input bind:value={character.skin}   disabled={readonly}/></div>
		</div>
	</div>
</div>
