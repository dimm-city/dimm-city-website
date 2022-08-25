<script lang="ts">
	import Image from '$lib/Components/Image.svelte';
	import type { IArticle } from '$lib/Shared/IArticle';
	import { marked } from 'marked';
	export let model: IArticle;
	export let imageAug = 'tl-clip tr-clip br-clip bl-clip border';
	let html = '';
	$: html = model != null ? marked.parse(model.description || ' ') : '';
</script>

<style>
	.article-grid {
		display: grid;
		padding: 3rem;
		min-height: 100%;
		grid-template-rows: min-content max-content;
	}

	.main-image {
		min-height: 300px;
		float: left;
		margin-inline-end: 0.75rem;
		margin-block-end: 0.2rem;
		/* color: rgba(255, 255, 255, 0.35) !important; */
	}

	.text-area {
		margin-top: 1rem;
		height: min-content;
	}
	:global(.text-area p) {
		margin-block-start: 0;
	}

	@media (max-width: 745px) {
		.main-image {
			max-width: 80vw;
			height: auto;
			margin-bottom: 1rem;
			float: unset;
		}
		:global(.main-image .image-wrapper) {
			width: 100%;
		}
		:global(.main-image img, .main-image video) {
			width: 100%;
			height: auto;
		}
	}
</style>

<div class="article-grid">
	<div class="title-area">
		<slot name="header">
			<h1>{model.name}</h1>
		</slot>
		<hr />
	</div>
	<article class="text-area">
		<div class="main-image">
			<slot name="main-image">
				<Image
					height=""
					width=""
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
