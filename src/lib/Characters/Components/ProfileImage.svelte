<script>
	import Image from '$lib/Shared/Components/Image.svelte';
	import { config } from '$lib/Shared/config';

	/**
	 * @type {DC.Character}
	 */
	export let character;

	//trim last slash from config.baseUrl	
	const baseUrl = config.baseUrl.replace(/\/$/, '');;

	let imageUrl =  baseUrl + character.attributes?.mainImage?.data?.attributes?.formats?.large.url ?? '';
	
</script>

<Image
	{imageUrl}
	modelUrl={character.attributes.mainModel?.data?.attributes.url}
	videoUrl={character.attributes.mainVideo?.data?.attributes.url}
	title={character.attributes.name}
	on:click
/>
