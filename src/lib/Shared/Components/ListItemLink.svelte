<script>
	/**
	 * @type {string}
	 */
	export let url;
	/**
	 * @type {string}
	 */
	export let text;
</script>

<a href={url}>
	<div class="list-item" data-augmented-ui>
		{text}
	</div>
</a>

<style>
	a {
		display: block;
		cursor: pointer;

		color: var(--light);
	}
	a:hover,
	a:focus {
		color: var(--pink);
	}
	.list-item {
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
		--aug-inlay-bg: #ffffff1e;
	}

	.list-item:hover,
	.list-item:focus {
		color: var(--pink);
		--aug-inlay-bg: transparent;
		background: #050505b4;
		transition: background 500ms;
	}
</style>
