<script lang="ts">
	import Input from '$lib/Components/Input.svelte';
	import ProfileImage from '$lib/Components/ProfileImage.svelte';
	import Textarea from '$lib/Components/Textarea.svelte';
	import { Character } from '../Character';
	export let character: Character = new Character();
	export let readonly = true;
	export let title = 'Biography';
</script>

<style>
	.container {
		height: 100%;
		display: grid;
		width: 100%;
		grid-template-columns: 0.7fr 1.6fr;
		grid-template-rows: min-content 0.5fr 0.8fr;
		gap: 1rem;
		grid-auto-flow: row;
		grid-template-areas:
			'title-area title-area'
			'image-area attributes-area'
			'description-area description-area';
	}
	.title-area {
		grid-area: title-area;
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
		height: 100%;
		width: 100%;
	}
	.description-area div:last-child {
		display: flex;
		height: 100%;
		padding-bottom: 1rem;
	}

	.attributes-area {
		grid-area: attributes-area;
	}

	.attributes {
		margin: 0;
		display: grid;
		grid-template-rows: 1fr;
		gap: 1rem;
	}
	.attributes div:nth-child(odd),
	.label {
		font-weight: bold;
		width: min-content;
		white-space: nowrap;
	}

	.label {
		margin-bottom: 1.25rem;
	}

	@media (max-width: 768px) {
		.container {
			height: 100%;
			display: grid;
			width: 100%;
			grid-template-columns: 1fr;
			grid-template-rows: min-content repeat(2, 1fr);
			gap: 1rem;
			grid-auto-flow: row;
			grid-template-areas:
				'title-area'
				'attributes-area'
				'description-area';
		}

		.image-area {
			display: none;
		}

		.attributes {
			margin: 0 0.5rem;
			display: grid;
			grid-template-rows: 1fr;
			gap: 1rem;
		}
		.attributes div:nth-child(odd),
		.label {
			font-weight: bold;
			width: min-content;
			white-space: nowrap;
			font-size: 0.7rem;
		}
	}
</style>

<div class="container">
	<div class="title-area">
		<h2>{title}</h2>
	</div>
	<div class="image-area">
		<ProfileImage {character} />
	</div>
	<div class="attributes-area">
		<div class="attributes">
			<div>What kind of vibe does {character.name} have?</div>
			<div><Input bind:value={character.vibe} disabled={readonly} /></div>
			<div>What virtures does {character.name} value?</div>
			<div><Input bind:value={character.beliefs} disabled={readonly} /></div>
			<div>What faults does {character.name} have?</div>
			<div><Input bind:value={character.flaws} disabled={readonly} /></div>
			<div>What dreams does {character.name} have?</div>
			<div><Input bind:value={character.dreams} disabled={readonly} /></div>
		</div>
	</div>
	<div class="description-area">
		<div class="label">Tell us a bit about {character.name}'s backstory...</div>
		<div><Textarea bind:value={character.backstory} disabled={readonly} /></div>
	</div>
</div>
