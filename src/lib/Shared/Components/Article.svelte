<script>
	import Image from '$lib/Shared/Components/Image.svelte';	
	import { marked } from 'marked';
	/**
	 * @type {import('../Models/IArticle').IArticle | null}
	 */
	 export let model;
	export let imageAug = 'tl-clip tr-clip br-clip bl-clip border';
	export let imageHeight = '';
	let html = '';
	$: html = model != null ? marked.parse(model.description || ' ') : '';
</script>

{#if model != null}
	<div class="article-grid">
		<div class="title-area">
			<slot name="header">
				<h1>{model.name}</h1>
				<hr />
			</slot>
		</div>
		<article class="text-area">
			<div class="main-image">
				<slot name="main-image">
					<Image
						imageUrl={model.imageUrl}
						title={model.name}
						videoUrl={model.videoUrl}
						aug={imageAug}
					/>
				</slot>
			</div>
			<section>
				<slot>
					{@html html}
				</slot>
			</section>
		</article>
	</div>
{/if}

<style>
	.article-grid {
		display: grid;
		/* padding: 3rem;
		min-height: 100%; */
		grid-template-rows: min-content max-content;
	}

	.main-image {
		/* min-height: 300px; */
		width: 3rem;
		aspect-ratio: 4/3;
		width: min-content;
		float: left;
		margin-inline-end: 0.75rem;
		margin-block-end: 0.2rem;
	}

	.text-area {
		margin-top: 1rem;
		height: min-content;
	}
	:global(.text-area p) {
		margin-block-start: 0;
	}

	@media (max-width: 745px) {
		/* .main-image {
			max-width: 80vw;
			min-height: min-content;
			height: auto;
			margin-bottom: 1rem;
			float: unset;
		} */
		/* :global(.main-image .image-wrapper) {
			width: 100%;
		}
		:global(.main-image img, .main-image video) {
			width: 100%;
			height: auto;
		} */
	}
</style>
