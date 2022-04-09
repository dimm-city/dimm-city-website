<script lang="ts">
	export let title;
	export let imageUrl;
	export let height = "100px";
</script>

<style>
	img {
		opacity: 0;
		transition: all;
		max-height: 100%;
		height: 100px;
		aspect-ratio: 3/4;
		margin: auto;
		transition-duration: 1s;
		transition-property: all;
		transition-timing-function: ease-in-out;
	}
	img:hover {
		transform: scale(1.3) translate(0, 0.5rem);
	}

	.thumbnail-wrapper {
		--aug-border: initial;
		--aug-border-all: 0.1rem;
		--aug-border-bg: var(--pink);
		aspect-ratio: 3/4;
		display: flex;
		margin: 1rem;
		background-image: url('/assets/missing-image.png'); 
		background-color: var(--translucent-dark);
		background-size: contain;
		background-position: center;
		overflow: hidden;
	}

	@media (max-width: 400px) {
		img, .thumbnail-wrapper {
			height: 75px;
		}
	}
</style>

<div class="thumbnail-wrapper" data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"  style="height: {height}">
	<img src={imageUrl} class="fade-in" alt={title} style="height: {height}" />
</div>
