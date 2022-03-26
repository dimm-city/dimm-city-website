<script lang="ts">
	import type { Character } from '$lib/Characters/Character';
	import Image from './Image.svelte';

	export let character: Character;
	$: imageUrl =
		character.thumbnailImage || (character.token ? character.token.thumbnail_uri : '/assets/missing-image.png');
</script>

<Image {imageUrl} title={character.name} />
