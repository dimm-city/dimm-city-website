<script >
	import List from '$lib/Shared/Components/List.svelte';
	import ListItemLink from '$lib/Shared/Components/ListItemLink.svelte';

	/**
	 * @type {DC.BaseEntity[]}
	 */
	export let districts= [];
	/**
	 * @type {DC.BaseEntity[]}
	 */
	export let specialties = [];
	/**
	 * @type {DC.BaseEntity[]}
	 */
	export let citizens = [];
</script>

<div class="container">
	<div class="hero">
		<div class="hero-title">
			
		</div>
		<div class="hero-body">
			
		</div>
	</div>
	<div  class="reference-header">
		<h4>Dimm City Reference</h4>
		<hr />
	</div>
	<div class="col1 col" data-augmented-ui>
		<h4><a href="/console/citizens">Citizens</a></h4>
		<hr />
		<div class="list-container">
			<List data={citizens} viewAllLink="/console/citizens">
				<ListItemLink slot="item" let:item url="/console/citizens/{item.attributes.tokenId}" text={item.attributes.name} />
			</List>
		</div>
	</div>
	<div class="col2 col" data-augmented-ui>
		<h4><a href="/specialties">Specialties</a></h4>
		<hr />
		<div class="list-container">
			<List data={specialties} viewAllLink="/console/specialties">
				<ListItemLink slot="item" let:item url="/console/specialties/{item.attributes.slug}" text={item.attributes.name} />
			</List>
		</div>
	</div>
	<div class="col3 col" data-augmented-ui>
		<h4><a href="/console/locations">Locations</a></h4>
		<hr />
		<div class="list-container">
			<List data={districts} viewAllLink="/console/locations">
				<ListItemLink slot="item" let:item url="/console/locations/{item.attributes.slug}" text={item.attributes.name} />
			</List>
		</div>
	</div>
	<!-- <div class="footer">
		<a href="/console/system-map" class="small-menu-item" data-augmented-ui>&lt;system map&gt;</a> 
	</div>-->
</div>

<style>
	.container {
		overflow-y: auto;
		margin-top: 1.5rem;
		display: grid;
		padding-inline: 1.5rem;
		grid-template-columns: 1fr;
		grid-template-rows: min-content auto min-content;
		gap: 1em;
		grid-auto-flow: row;
		grid-template-areas:
			'hero'
			'ref'
			'col1'
			'col2'
			'col3'
			'footer';
	}
	@media (min-width: 821px) {
		.container {
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: min-content min-content auto min-content;
			grid-template-areas:
				'hero hero hero'
				'ref ref ref'
				'col1 col2 col3'
				'footer footer footer';
		}
	}
	.hero {
		grid-area: hero;
	}

	.reference-header{
		grid-area: ref;
		height: min-content;
		margin-block-end: 0;
	}

	.col1 {
		grid-area: col1;
	}

	.col2 {
		grid-area: col2;
	}

	.col3 {
		grid-area: col3;
	}

	/* .footer {
		grid-area: footer;
	}
	.footer .small-menu-item {
		text-align: center;
	} */

	.col {
		padding-inline: 1rem;
		padding-bottom: 1.5rem;
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
		display: block;
		color: var(--light);
	}

	
	/* .footer a {
		height: min-content;
	}
	.footer a:hover,
	.footer a:focus {
		color: var(--pink);
		--aug-inlay-bg: transparent;
		background: #050505b4;
		transition: background 500ms;
	} */
	h4 {
		margin-bottom: 0.25rem;
	}
</style>
