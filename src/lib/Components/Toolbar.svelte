<style>
	.toolbar {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		height: fit-content;
		padding: 1rem 1rem;
		min-height: min-content;
		color: white;
		overflow: hidden;
		transition: all var(--quick-in);
		text-transform: uppercase;

		/* --aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;*/
		--aug-tl1: 0.25rem;
		--aug-tr1: 0.25rem;
		--aug-br1: 0.25rem;
		--aug-bl1: 0.25rem;
		--aug-border-bg: var(--secondary-accent);
		--aug-border-all: 1px;

		--aug-inlay: initial;
		--aug-inlay-bg: #000000f3;
	}


</style>

<div data-augmented-ui="tl-clip-x tr-clip-x br-rect-x bl-rect-x both" class="toolbar"><slot /></div>
