<script lang="ts">
	export let title;
	export let imageUrl;
	export let videoUrl = '';
	export let aug = 'tl-clip t-clip-x tr-clip-y br-clip b-rect bl-clip l-scoop border';
	export let classes ="";
	export let height = "400px";
	export let width = "300px";

	function onVideoLoaded() {
		console.log('video loaded');
	}
</script>

<style>
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

	.image-wrapper {
		/* max-width: min-content; */
		display: flex;
		margin: auto;

		/* background-image: url('/assets/missing-image.png'); */
		background-color: var(--translucent-dark);

		background-size: contain;
		background-position: center;

		overflow: hidden;
	}

	/* @media (max-width: 745px) {
		.image-wrapper {
			height: fit-content;
			width: fit-content;
		}		
	} */
</style>

<div on:click class="m-3 p-4 d-flex image-wrapper {classes}" data-augmented-ui={aug} style="height: {height}; width: {width}">
	{#if videoUrl > ''}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video autoplay on:loadeddata={onVideoLoaded} class="fade-in" loop  style="height: {height}; width: {width}">
			<source src={videoUrl} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	{:else}
		<img src={imageUrl} class="fade-in" alt={title}  style="height: {height}; width: {width}"/>
	{/if}
</div>
