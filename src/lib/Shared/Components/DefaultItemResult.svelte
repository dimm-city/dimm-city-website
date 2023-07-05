<script>
	/**
	 * @type {{ name: any; type: any; shortDescription: any; description: string; mainImage: any }}
	 */
	export let item;
	export let icon = 'bi-box';
	export let subtitle = '';
</script>

<div class="item-result-grid">
	<div class="item-result-title">
		{item.name}
	</div>
	<div class="item-result-subtitle">
		{subtitle}
	</div>

	<div class="item-result-description">
		<div class="item-result-image" data-augmented-ui="tl-rect tr-rect br-clip bl-clip both">
			{#if item.mainImage?.data}
				<img src={item.mainImage?.data?.attributes?.formats?.thumbnail.url} alt="thumbnail" />
			{:else}
				<i class="bi {icon} text-light" />
			{/if}
		</div>
		<div>{item.shortDescription ?? item.description ?? ''}</div>
	</div>
</div>

<style>
	.item-result-grid {
		display: grid;
		row-gap: 0.5rem;
		height: 110px;
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
	}
	.item-result-image {
		grid-area: image;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 75px;
		width: 75px;
		--aug-border: initial;
		--aug-border-all: 1px;
		--aug-tl: 5px;
		--aug-tr: 5px;
		--aug-bl: 7px;
		--aug-br: 7px;
	}
	.item-result-image img {
		height: 75px;
	}
	.item-result-image i {
		font-size: 50px;
		margin:0;
		padding: 0;
	}
	.item-result-description {
		grid-area: description;
		display: flex;
		flex-direction: row;
		align-items: start;
		gap: 0.5rem;
		font-size: small;
	}
</style>
