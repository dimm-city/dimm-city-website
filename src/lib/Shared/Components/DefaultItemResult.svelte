<script>
	import { config } from '../config';

	/**
	 * @type {{ name: any; type: any; shortDescription: any; description: string; mainImage: any }}
	 */
	export let item;
	export let icon = 'bi-box';
	export let subtitle = '';
	/**
	 * @type {string|null}
	 */
	 export let description = null;
	const baseUrl = (config.storageBaseUrl ?? config.baseUrl).replace(/\/$/, '');
</script>

<div class="item-result-grid {$$props.class}">
	<div class="item-result-title">
		{item.name}
	</div>
	<div class="item-result-subtitle">
		{subtitle}
	</div>

	<div class="item-result-description">
		<div class="item-result-image" data-augmented-ui="tl-rect tr-rect br-clip bl-clip both">
			{#if item.mainImage?.data}
				<img src={baseUrl + item.mainImage?.data?.attributes?.formats?.thumbnail.url} alt="thumbnail" />
			{:else}
				<i class="bi {icon} text-light" />
			{/if}
		</div>
		<div class="item-result-text">
			<slot>
				{description ?? item.shortDescription ?? item.description ?? ''}
			</slot>
		</div>
	</div>
</div>

<style>
	:root {
		--thumb-width: 60px;
		--thumb-height: 120px;
		--thumb-aspect-ratio: 3/4;
		--menu-item-height: fit-content;
		--thumb-fit: cover;
	}
	.item-result-grid {
		display: grid;
		height: 100%;
		row-gap: 0.5rem;
		grid-template-rows: min-content 1fr;
		grid-template-areas:
			'title subtitle'
			'description description';
	}

	.item-result-title {
		grid-area: title;
		color: var(--fourth-accent);
	}
	.item-result-subtitle {
		grid-area: subtitle;
		text-align: right;
		font-size: smaller;
		color: var(--secondary-accent);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.item-result-image {
		grid-area: image;
		display: flex;
		justify-content: center;
		align-items: center;

		height: var(--thumb-height);
		aspect-ratio: var(--thumb-aspect-ratio);

		--aug-border: initial;
		--aug-border-all: 1px;
		--aug-tl: 5px;
		--aug-tr: 5px;
		--aug-bl: 7px;
		--aug-br: 7px;
	}
	.item-result-image img {
		height: var(--thumb-height);
		aspect-ratio: var(--thumb-aspect-ratio);
		object-fit: var(--thumb-fit);
	}
	.item-result-image i {
		font-size: 50px;
		margin: auto;
		padding: 0;
		height: var(--thumb-height);
		aspect-ratio: var(--thumb-aspect-ratio);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-result-description {
		grid-area: description;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		font-size: small;
	}
	.item-result-text {
		padding-left: 0.25rem;
		width: 100%;
		height: 100%;
	}
</style>
