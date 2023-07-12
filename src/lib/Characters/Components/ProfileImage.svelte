<script>
	import Image from '$lib/Shared/Components/Image.svelte';

	/**
	 * @type {DC.Character}
	 */
	export let character;
	let imageUrl = character.attributes?.mainImage?.data?.attributes?.formats?.large.url ?? '';
</script>

<Image
	{imageUrl}
	modelUrl={character.attributes.mainModel?.data?.attributes.url}
	videoUrl={character.attributes.mainVideo?.data?.attributes.url}
	title={character.attributes.name}
	on:click
/>
