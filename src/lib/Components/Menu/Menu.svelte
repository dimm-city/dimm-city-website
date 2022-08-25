<script>
	// document.documentElement.style.setProperty('--menu-col', '1');
	export let columns = 2;
</script>

<style>
	.menu {
		/* margin-bottom: 5rem; */
		overflow-y: hidden;
		width: 100%;
		scrollbar-color: var(--third-accent) var(--secondary-accent);
		scrollbar-width: thin;
	}
	.menu > div {
		margin-bottom: 1rem;
	}
	.menu::-webkit-scrollbar {
		width: 0;
		display: none;
	}
	.menu-items {
		display: grid;
		gap: 1em;
		max-width: 100%;
		grid-template-columns: repeat(3, 1fr);
		list-style: none;
		overflow-y: visible;
		scrollbar-width: none;
	}

	.menu-items.col-1 {
		grid-template-columns: repeat(1, 1fr);
	}
	.menu-items.col-2 {
		grid-template-columns: repeat(2, 1fr);
	}

	.menu-items.col-3 {
		grid-template-columns: repeat(3, 1fr);
	}

	.menu-items.col-4 {
		grid-template-columns: repeat(4, 1fr);
	}
	.menu-items::--webkit-scrollbar {
		scrollbar-color: var(--third-accent) var(--secondary-accent);
		scrollbar-width: thin;
	}

	.menu-items > * {
		max-width: 90vw;
		overflow-x: hidden;
	}

	@media (max-width: 1024px) {
		.menu-items {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 1em;
		}
		.menu-items.col-3, .menu-items.col-4 {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 768px) {
		.menu {
			margin: 0;
		}
		.menu-items {
			grid-template-columns: repeat(1, 1fr);
			grid-gap: 1em;
		}
		.menu-items.col-3 , .menu-items.col-4{
			grid-template-columns: repeat(1, 1fr);
		}
	}
	@media (max-width: 480px) {
		.menu {
			margin: 0;
			margin-bottom: 10em;
		}
		.menu-items {
			grid-template-columns: repeat(1, 1fr);
			grid-gap: 0.8em;
		}
	}
</style>

<div class="menu">
	<div>
		<slot name="menu-toolbar" />
	</div>
	<div class="menu-items col-{columns}" data-augmented-ui-reset>
		<slot />
	</div>
</div>
