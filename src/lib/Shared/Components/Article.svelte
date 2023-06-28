<script>
	import Image from '$lib/Shared/Components/Image.svelte';
	import { marked } from 'marked';
	/**
	 * @type {import('../Models/IArticle').IArticle | null}
	 */
	export let model;
	export let imageAug = 'tl-clip tr-clip br-clip bl-clip border';
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
		:root{

			--dc-image-width: 400px;
			--dc-image-aspect-ratio: 4/3;
		}
		.article-grid {
			justify-content: center;
		}

		.main-image {
			float: none;
			margin-inline: auto;
			margin-block-end: 1rem;
		}
	}
</style>
