<style>
	.text-container {
        color: var(--light);
		height: min-content;
		padding: 1.5em;
		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 0.1rem;
		--aug-tl1: 1vh;
		--aug-tr1: 2vh;
		--aug-br1: 1vh;
		--aug-bl1: 1vh;
		--aug-border-bg: radial-gradient(circle at top left, var(--secondary-accent) 40px, transparent 50px),
			radial-gradient(circle at top right, var(--secondary-accent) 20px, transparent 30px),
			radial-gradient(circle at bottom right, var(--secondary-accent) 40px, transparent 50px),
			radial-gradient(circle at bottom left, var(--secondary-accent) 20px, transparent 30px);

		--aug-inlay: initial;
		--aug-inlay-bg: var(--menu-inlay-bg-color);
		background-color: transparent;
	}
</style>

<div class="text-container" data-augmented-ui><slot /></div>
