<script lang="ts">
	import Input from '$lib/Components/Input.svelte';
	import ProfileImage from '$lib/Components/ProfileImage.svelte';
	import Textarea from '$lib/Components/Textarea.svelte';
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
	.description-area div{
		display: contents;
	}

	.attributes-area {
		grid-area: attributes-area;
	}

	.attributes {
		margin: 0 0.5rem;
		display: grid;
		grid-template-rows: 1fr;
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
			<div>What kind of vibe does {character.name} have?</div>
			<div><Input bind:value={character.vibe} /></div>
			<div>What virtures does {character.name} value?</div>
			<div><Input bind:value={character.beliefs} /></div>
			<div>What faults does {character.name} have?</div>
			<div><Input bind:value={character.beliefs} /></div>
			<div>What dreams does {character.name} have?</div>
			<div><Input bind:value={character.dreams} /></div>
		</div>
	</div>
	<div class="description-area">
		<div>Tell us a bit about {character.name}'s backstory...</div>
		<div style="display:contents;"><Textarea bind:value={character.dreams} /></div>
	</div>
</div>
