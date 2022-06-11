<script lang="ts">
	import type { Character } from '$lib/Characters/Character';
	import Image from '../../Components./../Components/Image.svelte';

	export let character: Character;
	$: imageUrl =
		character.thumbnailImage ||
		character.imageUrl ||
		(character.token ? character.token.thumbnail_uri : '/assets/missing-image.png');
</script>

<style>
	:global(.main-image img, .main-image video) {
		width: 100%;
		height: 100%;
	}
</style>

<Image {imageUrl} title={character.name} on:click />
