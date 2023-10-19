<script>
	import Image from '$lib/Shared/Components/Image.svelte';

	/**
	 * @type {DC.Item}
	 */
	export let item;
</script>

<article class="item-viewer">
	<h1>{item?.attributes.name}</h1>
	<section>
		<Image
			classes="item-image"
			imageUrl={item?.attributes.mainImage?.data?.attributes?.formats?.medium?.url ??
				item?.attributes.mainImage?.data?.attributes?.url}
			modelUrl={item?.attributes.mainModel?.data?.attributes.url}
			videoUrl={item?.attributes.mainVideo?.data?.attributes.url}
			title={item?.attributes.name}
		/>
		<span class="inline">
			<h3 class="inline">Type:</h3>
			<span>{item?.attributes.type}</span>
		</span>
		<h3>Description</h3>
		<p>{item?.attributes.description}</p>
	</section>
</article>

<style>
	.item-viewer {
		--dc-image-height: 300px;
		--dc-image-width: auto;
		--dc-image-aspect-ratio: 1;
	}

	h1 {
		margin-top: 0;
		color: var(--secondary-accent);
	}
	h3 {
		margin-bottom: 0.5rem;
	}
	.inline {
		display: inline-block;
		margin-bottom: 0.5rem;
	}
	.inline h3 {
		display: inline;
	}
	p {
		margin: 0;
	}
	:global(.item-image) {
		float: left;
		margin-right: 1em;
		margin-bottom: 1em;
	}

	@media (width < 600px) {
		section {
			width: min-content;
		}
		.item-viewer {
			margin-inline: auto;
		}
		.item-viewer section {
			align-items: center;
		}
		:global(.item-image) {
			float: left;
			margin-right: 0;
		}
	}
</style>
