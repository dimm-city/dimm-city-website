<script>
	/**
	 * @type {DC.BaseEntity[] | null}
	 */
	 export let data = [];
</script>

<div class="container">
	{#if data != null}
		{#each data as item}
			<a href="/journal-entries/{item.attributes?.slug}" class="small hero-item" data-augmented-ui>
				<div class="" style="">
					<div class="title-container">{item.attributes?.name}</div>
				</div>
				<div class="description">
					<small>{item.attributes?.shortDescription || ''}</small>
				</div>
			</a>
		{/each}
	{/if}
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1em 1em;
		grid-template-columns: 1fr;
	}
	@media (min-width: 1024px) {
		.container {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	.hero-item {
		padding: 0.75rem;
		padding: 1rem;
		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 1px;
		--aug-tl1: 0.5rem;
		--aug-tr1: 1rem;
		--aug-br1: 0.5rem;
		--aug-bl1: 0.5rem;
		--aug-border-bg: radial-gradient(circle at top left, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at top right, var(--blue) 20px, transparent 30px),
			radial-gradient(circle at bottom right, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at bottom left, var(--blue) 20px, transparent 30px);

		--aug-inlay: initial;
		--aug-inlay-bg: #05050552;
		background: #0505051e;
	}
	a {
		color: var(--light);
	}
	a:hover,
	a:focus {
		color: var(--pink);
	}
</style>
