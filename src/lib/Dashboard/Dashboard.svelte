<script>
	import List from '$lib/Components/List.svelte';
	import FlexMenu from '$lib/Components/Menu/FlexMenu.svelte';
	import { getLatestNews } from './getLatestNews';
	import { getDistricts } from './getDistricts';
	import { getSpecialties } from './getSpecialties';
	import { getLatestCitizens } from './getNewestCitizens';
	let newsQuery = getLatestNews().then((d) => (lastestNews = d));
	let lastestNews = [];

	let districts = [];
	let locationQuery = getDistricts().then((d) => (districts = d));

	let specialties = [];
	let specialtyQuery = getSpecialties().then((d) => (specialties = d));

	let citizens = [];
	let citizenQuery = getLatestCitizens().then((d) => (citizens = d));
</script>

<style>
	.container {
		display: grid;
		padding-inline: 1.5rem;

		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 0.6fr min-content 0.3fr;
		gap: 1em 1em;
		grid-auto-flow: row;
		grid-template-areas:
			'hero hero hero'
			'col1 col2 col3'
			'footer footer footer';
	}

	.hero {
		grid-area: hero;
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

	.footer {
		grid-area: footer;
	}
	.footer .small-menu-item {
		text-align: center;
	}

	.col {
		padding-inline: 1rem;
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
		--aug-inlay-bg: transparent;
		background: #ffffff1e;
	}
</style>

<div class="container">
	<div class="hero">
		<div class="hero-title">
			<h4>News</h4>
			<hr />
		</div>
		<div class="hero-body">
			<FlexMenu query={newsQuery} data={lastestNews} />
		</div>
	</div>
	<div class="col1 col" data-augmented-ui>
		<h4>Citizens</h4>
		<hr />
		<div class="list-container">
			<List data={citizens} />
		</div>
	</div>
	<div class="col2 col" data-augmented-ui>
		<h4>Specialties</h4>
		<hr />
		<div class="list-container">
			<List data={specialties} />
		</div>
	</div>
	<div class="col3 col" data-augmented-ui>
		<h4>Locations</h4>
		<hr />
		<div class="list-container">
			<List data={districts} />
		</div>
	</div>
	<div class="footer">
		<h3 class="small-menu-item" data-augmented-ui>&lt;system map&gt;</h3>
	</div>
</div>
