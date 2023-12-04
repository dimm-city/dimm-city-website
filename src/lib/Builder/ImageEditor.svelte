<script>
	import Image from '$lib/Shared/Components/Image.svelte';
	import { config } from '$lib/Shared/config';
	import { selectedCharacter } from './BuilderStore';

	//trim last slash from config.baseUrl
	const baseUrl = (config.storageBaseUrl ?? config.baseUrl).replace(/\/$/, '');
	let { mainImage, mainModel, mainVideo, name } = $selectedCharacter?.attributes;

	let imageUrl = '';
	$: if ($selectedCharacter.id == '') {
		let { mainImage, mainModel, mainVideo, name } = $selectedCharacter?.attributes;

		let relativeUrl =
			mainImage?.data?.attributes?.url ?? mainImage?.data?.attributes?.formats?.large?.url;

		if (!relativeUrl) relativeUrl = `${baseUrl}/assets/missing-image.png`;
		if (!relativeUrl.startsWith('http')) relativeUrl = baseUrl + relativeUrl;
		imageUrl = relativeUrl;
	}
</script>

<Image
	{imageUrl}
	modelUrl={mainModel?.data?.attributes.url}
	videoUrl={mainVideo?.data?.attributes.url}
	title={name}
	on:click
/>
