<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';

	export let title: string;
	export let imageUrl: string;
	export let videoUrl = '';
	export let modelUrl = ''; ///assets/pink-dagger.glb
	export let skyboxUrl = '';
	export let aug = 'tl-clip t-clip-x tr-clip-y br-clip b-rect bl-clip l-scoop border';
	export let classes = '';

	let image: HTMLImageElement;
	let video: HTMLVideoElement;
	let hasVideo = false;
	let hasImage = false;
	let mediaUrl: string | null;

	function onVideoLoaded() {
		hasVideo = true;
		console.log('video loaded');
	}
	function onImageLoaded() {
		hasImage = true;
		console.log('image loaded');
	}
	function onCanPlay() {
		console.log('can play');
	}
	$: if (videoUrl > "") {
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


	
	onMount(async () => {
		mediaUrl = videoUrl;
		if(image?.complete){
			hasImage = true;
		}
	});
</script>
<svelte:head>
	<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
</svelte:head>
<div
	class="m-3 p-4 d-flex image-wrapper {classes}"
	class:missing={!hasImage && !hasVideo && modelUrl == ''}
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
		class:hidden={!hasVideo}
		disablepictureinpicture
		playsinline
		loop
	>
		<source src={mediaUrl} type="video/mp4" />

		Your browser does not support the video tag.
	</video>
	{#if modelUrl > ''}
		<model-viewer
			src={modelUrl}
			on:load={() => (video.style.display = 'none')}
			alt={title}
			auto-rotate
			autoplay
			camera-controls
			environment-image={skyboxUrl}
			poster={imageUrl}
		/>
	{:else if !hasVideo}
		<img bind:this={image} src={imageUrl} class="fade-in" class:hidden={!imageUrl} alt={title} on:load={onImageLoaded} />
	{/if}
</div>

<style>
	model-viewer {
		width: 100%;
		height: 100%;
		--progress-bar-color: rgba(255, 255, 255, 0.5);
		--poster-color: transparent;
	}

	img,
	video,
	.image-wrapper {
		height: var(--dc-image-height);
		width: min(80dvw, var(--dc-image-width));
	}

	

	.image-wrapper.missing {
		background-image: url('/assets/missing-image.png');
		background-repeat: no-repeat;
		
	}
	img,
	video {
		opacity: 0;
		transition: all;
		transition-duration: 1s;
		transition-property: all;
		transition-timing-function: ease-in-out;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	img:hover,
	video:hover {
		transform: scale(1.3) translate(-30%, -30%);
	}

	.hidden{
		visibility: hidden;
	}
	.image-wrapper {
		display: flex;

		background-color: var(--translucent-dark);
		background-size: contain;
		background-position: center;
		overflow: hidden;
		aspect-ratio: var(--dc-image-aspect-ratio);
		--aug-border-all: 1px;
	}
</style>
