<script script lang="ts">
	import List from '$lib/Shared/Components/List.svelte';
	import type { ISummaryItem } from '$lib/Shared/Models/ISummaryItem';
	import { getDashboardEntries } from './getDashboardEntries';
	import { getDistricts } from './getDistricts';
	import { getSpecialties } from './getSpecialties';
	import { getLatestCitizens } from './getNewestCitizens';
	import ListItemLink from '$lib/Shared/Components/ListItemLink.svelte';
	import Hero from './Hero.svelte';
	import { onMount } from 'svelte';
	let newsQuery: any;
	let latestNews: ISummaryItem[] = [];
	let districts: ISummaryItem[] = [];
	let specialties: ISummaryItem[] = [];
	let citizens: ISummaryItem[] = [];

	onMount(() => {
		getDashboardEntries().then(
			(d) => (latestNews = d?.filter((item) => item?.id == 2 || item?.id == 4 || item?.id == 5))
		);
		getDistricts().then((d) => (districts = d));
		getSpecialties().then((d) => (specialties = d));
		getLatestCitizens().then((d) => (citizens = d));
	});
</script>

<div class="container">
	<div class="hero">
		<div class="hero-title">
			<h4><a href="/journal-entries">Founder's Notes</a></h4>
			<hr />
		</div>
		<div class="hero-body">
			<Hero query={newsQuery} data={latestNews} />
		</div>
	</div>
	<div style="grid-area: ref;">
		<h4>Dimm City Reference</h4>
		<hr />
	</div>
	<div class="col1 col" data-augmented-ui>
		<h4><a href="/citizens">Citizens</a></h4>
		<hr />
		<div class="list-container">
			<List data={citizens} viewAllLink="/citizens">
				<ListItemLink slot="item" let:item url="/citizens/{item.tokenId}" text={item.name} />
			</List>
		</div>
	</div>
	<div class="col2 col" data-augmented-ui>
		<h4><a href="/specialties">Specialties</a></h4>
		<hr />
		<div class="list-container">
			<List data={specialties} viewAllLink="/specialties">
				<ListItemLink slot="item" let:item url="/specialties/{item.slug}" text={item.name} />
			</List>
		</div>
	</div>
	<div class="col3 col" data-augmented-ui>
		<h4><a href="/locations">Locations</a></h4>
		<hr />
		<div class="list-container">
			<List data={districts} viewAllLink="/locations">
				<ListItemLink slot="item" let:item url="/locations/{item.slug}" text={item.name} />
			</List>
		</div>
	</div>
	<div class="footer">
		<a href="/system-map" class="small-menu-item" data-augmented-ui>&lt;system map&gt;</a>
	</div>
</div>

<style>
	.container {
		margin-top: 1.5rem;
		display: grid;
		padding-inline: 1.5rem;
		grid-template-columns: 1fr;
		grid-template-rows: 0.6fr * 0.3fr;
		gap: 1em 1em;
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
		/* --aug-inlay-bg: transparent;
		background: #ffffff00; */
		--aug-inlay-bg: #05050552;
		background: #0505051e;
	}
	a {
		display: block;
		color: var(--light);
	}

	.hero-body,
	.footer {
		margin-top: 1.25rem;
	}
	.footer a {
		height: min-content;
	}
	.footer a:hover,
	.footer a:focus {
		color: var(--pink);
		--aug-inlay-bg: transparent;
		background: #050505b4;
		transition: background 500ms;
	}
	h4 {
		margin-bottom: 0.25rem;
	}
</style>
