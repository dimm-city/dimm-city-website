<script lang="ts">
	export let title;
	export let imageUrl;
</script>

<style>
	img {
		opacity: 0;
		transition: all;
		max-height: 100%;
		margin: auto;
		transition-duration: 1s;
		transition-property: all;
		transition-timing-function: ease-in-out;
	}
	img:hover {
		transform: scale(1.3) translate(0, 1rem);
	}

	.image-wrapper {
		/* max-width: min-content; */
		display: flex;
		margin: auto;
		height: 400px;
		width: 300px;
		background-image: url('/assets/missing-image.png');
		background-size: contain;
		background-position: center;

		overflow: hidden;
	}

	@media (max-width: 745px) {
		.image-wrapper {
			height: fit-content;
			width: fit-content;
		}
		.image-wrapper img {
			max-width: 220px;
		}
	}
</style>

<div
	class="m-3 p-4 d-flex image-wrapper text-primary"
	data-augmented-ui="tl-clip t-clip-x tr-clip-y br-clip b-rect bl-clip l-scoop border"
>
	<!-- {#if animation_url > ""} -->
	<!-- svelte-ignore a11y-media-has-caption -->
	<!-- <video autoplay on:loadeddata={onVideoLoaded} class="fade-in">
                <source src={$animation_url} type="video/mp4" />

                Your browser does not support the video tag.
            </video> -->
	<!-- <p class:d-none={isVideoLoaded}>loading...</p>
            {:else} -->

	<img src={imageUrl} class="fade-in" alt={title} />
	<!-- {/if} -->
</div>
