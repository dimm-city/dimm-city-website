<script lang="ts">
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import Image from '$lib/Shared/Components/Image.svelte';

	export let character: ICharacter;
	$: imageUrl =
		character.thumbnailImage ||
		character.imageUrl ||
		(character.token ? character.token.thumbnail_uri : '/assets/missing-image.png');
</script>

<Image {imageUrl} title={character.name} on:click />
