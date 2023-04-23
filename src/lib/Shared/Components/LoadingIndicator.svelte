<div class="loading-indicator fade-in" data-augmented-ui>
	<slot>Loading...</slot>
</div>
<style>
	.loading-indicator {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		cursor: none;
		padding: 1rem;
		min-height: max-content;
		font-size: 2.5vh;
		color: white;
		overflow: hidden;
		opacity: 0.75;
		text-shadow: 0 0 0.25vh black, 0 0 0.25vh black;
		transition: all var(--quick-in);
		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 0.25vh;
		--aug-tl1: 1vh;
		--aug-tr1: 2vh;
		--aug-br1: 1vh;
		--aug-bl1: 1vh;
		--aug-border-bg: radial-gradient(circle at top left, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at top right, var(--blue) 20px, transparent 30px),
			radial-gradient(circle at bottom right, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at bottom left, var(--blue) 20px, transparent 30px);

		--aug-inlay: initial;
		--aug-inlay-bg: var(--menu-inlay-bg-color);
		background-color: transparent;
		--transition-in-delay: 0;
	}

	.loading-indicator > * {
		display: flex;
	}
</style>
