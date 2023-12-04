<script>
	import Image from '$lib/Shared/Components/Image.svelte';
	import { config } from '$lib/Shared/config';

	/**
	 * @type {DC.Character | null}
	 */
	export let character;

	//trim last slash from config.baseUrl
	const baseUrl = (config.storageBaseUrl ?? config.baseUrl).replace(/\/$/, '');
	let mainImage;
	/**
	 * @type {{ data: any; }}
	 */
	let mainModel;
	/**
	 * @type {{ data: any; }}
	 */
	let mainVideo;
	/**
	 * @type {string}
	 */
	let name;

	let relativeUrl;
	if (character) {
		//mainImage, mainModel, mainVideo;
		name = character.attributes.name;
		mainImage = character.attributes.mainImage;
		mainModel = character.attributes.mainModel;
		mainVideo = character.attributes.mainVideo;

		relativeUrl =
			mainImage?.data?.attributes?.url ?? mainImage?.data?.attributes?.formats?.large?.url;

		if (!relativeUrl) relativeUrl = `${baseUrl}/assets/missing-image.png`;
		if (!relativeUrl.startsWith('http')) relativeUrl = baseUrl + relativeUrl;
	} else {
		relativeUrl = `${baseUrl}/assets/missing-image.png`;
	}
	const imageUrl = relativeUrl;
</script>

<Image
	{imageUrl}
	modelUrl={mainModel?.data?.attributes.url}
	videoUrl={mainVideo?.data?.attributes.url}
	title={name}
	on:click
/>
