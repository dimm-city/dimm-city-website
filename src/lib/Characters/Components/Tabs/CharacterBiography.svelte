<script lang="ts">
	import Input from '$lib/Components/Input.svelte';
	import ProfileImage from '$lib/Characters/Components/ProfileImage.svelte';
	import Textarea from '$lib/Components/Textarea.svelte';
	import TextContainer from '$lib/Components/TextContainer.svelte';
	import { Character } from '../../Models/Character';
	export let character: Character = new Character();
	export let readonly = true;
	export let title = 'Biography';
</script>

<style>
	.container {
		height: 100%;
		display: grid;
		width: 100%;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, min-content);
		gap: 1rem;
		grid-auto-flow: row;
		grid-template-areas:
			'title-area'
			'image-area'
			'attributes-area'
			'description-area';
	}

	.title-area {
		grid-area: title-area;
	}

	.title-area h2 {
		font-size: clamp(0.7rem, 1.25rem, 1.5rem);
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
	.label {
		margin-bottom: 1.25rem;
	}

	@media (min-width: 768px) and (min-height: 500px) {
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
	}
</style>

<div class="container">
	<div class="title-area">
		<h2>{character.name}'s {title}</h2>
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
		{#if readonly}
			<div class="label">{character.name}'s backstory</div>
			<TextContainer>{character.backstory > '' ? character.backstory : '404: Unable to locate file'}</TextContainer>
		{:else}
			<div class="label">Tell us a bit about {character.name}'s backstory...</div>
			<Textarea bind:value={character.backstory} disabled={readonly} />
		{/if}
	</div>
</div>
