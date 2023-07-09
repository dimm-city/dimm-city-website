<script>
	import Image from '$lib/Shared/Components/Image.svelte';
	import { config } from '$lib/Shared/config';

	/**
	 * @type {DC.Character}
	 */
	export let character;
	let imageUrl = character.attributes?.mainImage?.data?.attributes?.formats?.large.url ?? '';
	// $: if (character?.attributes.tokenId) {
	// 	// //HACK: this should not be done by splitting strings!!
	// 	let imagePath = `${character.attributes.tokenId?.split('-').at(0)}/${character.attributes.tokenId
	// 		.split('-')
	// 		.at(1)}.png`;
	// 	imageUrl = `${config.apiBaseUrl}/chain-wallets/images/${imagePath}`;
	// } else {
	// 	imageUrl = character.attributes.mainImage.data.attributes.formats?.large.url ?? '';
	// }
</script>

<Image
	{imageUrl}
	modelUrl={character.attributes.mainModel?.data?.attributes.url}
	videoUrl={character.attributes.mainVideo?.data?.attributes.url}
	title={character.attributes.name}
	on:click
/>
