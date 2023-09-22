<script>
	/**
	 * @type {DC.Spore}
	 */
	 export let spore;
	/**
	 * @type {HTMLDivElement}
	 */
	let panel;	
	$: if (spore && panel) {
		panel.style.setProperty('--cover-image', `url('${spore.attributes.imageUrl ?? '/assets/imgs/the-archive-district.png'}')`);
	}
</script>

<style>
	.image {
		content: ' ';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-image: var(--cover-image);
		background-position: top;
		background-size: contain;
		background-repeat: no-repeat;
		background-clip: content-box;
		background-blend-mode: overlay;
		opacity: 1;
		z-index: -1;
	}
</style>

<div class="panel front-cover" data-augmented-ui bind:this={panel}>
	<div class="image" />
	<div class="container" data-update>
		<h1>{spore.attributes.name}</h1>
		<h3>{spore.attributes.subtitle}</h3>
		{@html spore.attributes.introduction}
	</div>
</div>
