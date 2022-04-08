<script>
	export let border = '';
	export let shape = 'default';
</script>

<style>
	.aug-button {
		display: inline-block;
		cursor: pointer;
		padding: 0.5rem 0.75rem;
		color: white;
		overflow: hidden;
		opacity: 0.75;
		text-shadow: 0 0 0.25vh black, 0 0 0.25vh black;
		transition: all var(--quick-in);
		text-transform: uppercase;

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
		background-color: transparent;
	}

	.aug-button:hover,
	.aug-button:focus {
		background-color: #ffffff1e;
		opacity: 1;
		color: var(--third-accent);
		--aug-border-bg: radial-gradient(circle at top left, var(--third-accent) 40px, transparent 50px),
			radial-gradient(circle at top right, var(--primary-accent) 20px, transparent 30px),
			radial-gradient(circle at bottom right, var(--third-accent) 40px, transparent 50px),
			radial-gradient(circle at bottom left, var(--primary-accent) 20px, transparent 30px);
	}

	:global(.aug-button small) {
		font-size: 0.7em;
	}

	.square {
		--aug-tl1: 0.5rem;
		--aug-tr1: 0.5rem;
		--aug-br1: 0.5rem;
		--aug-bl1: 0.5rem;
		aspect-ratio: 1/1;
	}
</style>

<div data-augmented-ui class="aug-button {shape}" style="--aug-border-bg: {border}" on:click><slot /></div>
