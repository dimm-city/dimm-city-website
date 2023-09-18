<script>
	import Image from '$lib/Shared/Components/Image.svelte';
	import { config } from '$lib/Shared/config';

	/**
	 * @type {DC.Character}
	 */
	export let character;

	//trim last slash from config.baseUrl
	const baseUrl = config.baseUrl.replace(/\/$/, '');
	const { mainImage, mainModel, mainVideo, name } = character.attributes;
	const relativeUrl = mainImage?.data?.attributes?.formats?.large.url;
	const imageUrl = relativeUrl ? `${baseUrl}${relativeUrl}` : null;
</script>

<Image
	{imageUrl}
	modelUrl={mainModel?.data?.attributes.url}
	videoUrl={mainVideo?.data?.attributes.url}
	title={name}
	on:click
/>