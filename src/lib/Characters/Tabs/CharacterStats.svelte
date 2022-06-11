<script lang="ts">
	import Input from '$lib/Components/Input.svelte';
	import ProfileImage from '$lib/Characters/Components/ProfileImage.svelte';
	import { Character } from '../Character';
	export let character: Character = new Character();
	export let readonly = true;
	export let title = 'Stats';

	function openImage() {
		if (character != null) window.open(character.imageUrl, '_blank');
	}
</script>

<style>
	.container {
		width: 100%;
		display: grid;
		grid-template-columns: 0.7fr 1.6fr;
		grid-template-rows: min-content 0.5fr 0.5fr;
		gap: 1.25rem 1rem;
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

	:global(.image-area img) {
		cursor: pointer;
	}

	.attributes-area {
		grid-area: attributes-area;
	}

	.attributes {
		margin: 0 0.5rem;
		display: grid;
		grid-template-columns: 0.5fr 1fr;
		gap: 1rem;
	}
	.attributes div:nth-child(odd) {
		font-weight: bold;
		width: min-content;
		white-space: nowrap;
		display: flex;
		align-items: center;
	}

	@media (max-width: 768px) {
		.container {
			height: 100%;
			display: grid;
			width: 100%;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, 1fr);
			gap: 1rem;
			grid-auto-flow: row;
			grid-template-areas:
				'title-area'
				'image-area'
				'attributes-area';
		}

		.title-area {
			display: none;
		}
		.attributes {
			margin: 1rem 2rem 5rem;
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		.attributes div:nth-child(odd) {
			font-weight: bold;
			width: min-content;
			display: flex;
			align-items: center;
		}
		.attributes div:nth-child(even) {
			margin-bottom: 0.75rem;
		}
	}
</style>

<div class="container">
	<div class="title-area">
		<h2>{title}</h2>
	</div>
	<div class="image-area">
		<ProfileImage {character} on:click={openImage} />
	</div>
	<div class="attributes-area">
		<div class="attributes">
			<div>Name</div>
			<div><Input bind:value={character.name} disabled={readonly} /></div>
			<div>Pronouns:</div>
			<div><Input bind:value={character.pronouns} disabled={readonly} /></div>
			<div>Age</div>
			<div>
				<Input
					type="number"
					required
					min="1"
					max="200"
					bind:value={character.age}
					disabled={readonly}
					placeholder="21"
				/>
			</div>
			<div>Height (m)</div>
			<div>
				<Input
					bind:value={character.height}
					required
					type="number"
					step="0.5"
					min="0"
					max="100"
					disabled={readonly}
					placeholder="1.2"
				/>
			</div>
			<div>Weight (kg)</div>
			<div>
				<Input
					type="number"
					required
					min="0"
					max="100"
					bind:value={character.weight}
					disabled={readonly}
					placeholder="22"
				/>
			</div>
			<div>Eyes:</div>
			<div><Input bind:value={character.eyes} disabled={true} /></div>
			<div>Skin:</div>
			<div><Input bind:value={character.skin} disabled={true} /></div>
		</div>
	</div>
</div>
