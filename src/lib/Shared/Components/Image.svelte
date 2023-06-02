<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';

	export let title: string;
	export let imageUrl: string;
	export let videoUrl = '';
	export let aug = 'tl-clip t-clip-x tr-clip-y br-clip b-rect bl-clip l-scoop border';
	export let classes = '';

	let video: HTMLVideoElement;
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

<div
	class="m-3 p-4 d-flex image-wrapper {classes}"
	data-augmented-ui={aug}
	style="position: relative;"
>

		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			bind:this={video}
			id={title}
			autoplay
			on:canplay={onCanPlay}
			on:loadeddata={onVideoLoaded}
			class="fade-in"
			disablepictureinpicture
			playsinline
			loop
		>
			<source src={mediaUrl} type="video/mp4" />

			Your browser does not support the video tag.
		</video>
		{#if !hasVideo}
		<img
			src={imageUrl}
			class="fade-in"
			alt={title}
		/>
	{/if}
</div>

<style>
	img,
	video,
	.image-wrapper {
		height: var(--dc-image-height);
		width: var(--dc-image-width);
	}
	img,
	video {
		opacity: 0;
		transition: all;
		transition-duration: 1s;
		transition-property: all;
		transition-timing-function: ease-in-out;

		position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
	}
	img:hover,
	video:hover {
		transform: scale(1.3) translate(-30%, -30%);
	}

	.image-wrapper {
		display: flex;
		margin: auto;
		background-color: var(--translucent-dark);
		background-size: contain;
		background-position: center;
		overflow: hidden;
		aspect-ratio: var(--dc-image-aspect-ratio);
		--aug-border-all: 1px;
	}
</style>
