<script lang="ts">
	export let title;
	export let imageUrl;
</script>

<style>
	img {
		opacity: 0;
		transition: all;
		max-height: 100%;
		height: 100px;
		margin: auto;
		transition-duration: 1s;
		transition-property: all;
		transition-timing-function: ease-in-out;
	}
	img:hover {
		transform: scale(1.3) translate(0, 1rem);
	}

	.thumbnail-wrapper {
		--aug-border: initial;
		--aug-border-all: 0.1rem;
		--aug-border-bg: var(--pink);
		/* max-width: min-content; */
		display: flex;
		margin: 1rem;
		min-height: 40px;
		min-width: 30px;
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
		.image-wrapper img {
			max-width: 15px;
		}
	} */
</style>

<div
	class="thumbnail-wrapper"
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
