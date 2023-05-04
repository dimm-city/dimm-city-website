<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;
	export let imageUrl: string;
	export let videoUrl = '';
	export let aug = 'tl-clip t-clip-x tr-clip-y br-clip b-rect bl-clip l-scoop border';
	export let classes = '';

	let video: any;
	let hasVideo = false;
	let mediaUrl: string | null;

	function onVideoLoaded() {
		console.log('video loaded');
	}
	function onCanPlay() {
		console.log('can play');
	}
	$: if (videoUrl) {
		console.log('video changed', videoUrl, video);
		mediaUrl = videoUrl;
		hasVideo = mediaUrl != null;
		if (video != null) {
			video.querySelector('source').src = mediaUrl;
			video.load();
		}
	} else {
		hasVideo = false;
		mediaUrl = null;
	}

	onMount(() => {
		console.log('mount');
		mediaUrl = videoUrl;
	});
</script>

<div on:click on:keyup class="m-3 p-4 d-flex image-wrapper {classes}" data-augmented-ui={aug}>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={video}
		id={title}
		autoplay
		on:canplay={onCanPlay}
		on:loadeddata={onVideoLoaded}
		class="fade-in"
		class:d-none={hasVideo == false}
		loop
	>
		<source src={mediaUrl} type="video/mp4" />

		Your browser does not support the video tag.
	</video>
	{#if hasVideo == false}
		<img src={imageUrl} class="fade-in" alt={title}  />
	{/if}
</div>

<style>

	img,
	video,
	.image-wrapper {
		height: var(--dc-image-height);
		width: var(--dc-image-width);
		aspect-ratio: var(--dc-image-aspect-ratio);
	}
	img,
	video {
		opacity: 0;
		transition: all;
		margin: auto;
		transition-duration: 1s;
		transition-property: all;
		transition-timing-function: ease-in-out;
	}
	img:hover,
	video:hover {
		transform: scale(1.3) translate(0, 1rem);
	}

	.d-none {
		display: none;
	}

	.image-wrapper {
		/* max-width: min-content; */
		display: flex;
		margin: auto;

		/* background-image: url('/assets/missing-image.png'); */
		background-color: var(--translucent-dark);

		background-size: contain;
		background-position: center;

		overflow: hidden;

		aspect-ratio: var(--dc-image-aspect-ratio);
	}

	/* @media (max-width: 745px) {
		.image-wrapper {
			height: fit-content;
			width: fit-content;
		}		
	} */
</style>
