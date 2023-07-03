<script>
	import { config } from '$lib/Shared/config';
	import PagedResults from '$lib/Shared/Components/PagedResults.svelte';
	/**
	 * @type {any}
	 */
	export let query;
	export let endpoint = config.apiBaseUrl + '/items';
	/**
	 * @type {any}
	 */
	 export let initialData = {};
	 export let autoLoad =false;

	let resultsComponent;

	// @ts-ignore
	export const search = resultsComponent?.search;
	// @ts-ignore
	export const nextPage = resultsComponent?.nextPage;
	//search-results-wrapper on:scroll={resultsComponent.handleScroll}
</script>

<div class="search-grid">
	<div class="search-results-wrapper">
		<PagedResults bind:this={resultsComponent} {endpoint} {query} results={initialData} {autoLoad}>
			<svelte:fragment slot="result" let:result>
				<slot name="result" {result} />
			</svelte:fragment>
		</PagedResults>
	</div>
	<div class="search-form-wrapper">
		<slot name="search" {resultsComponent} />
	</div>
</div>

<style>
	.search-grid {
		display: grid;
		grid-template-rows: min-content auto;
		grid-template-areas:
			'search'
			'results';
		margin-inline: 2rem;
		overflow: hidden;
	}
	.search-form-wrapper {
		grid-area: search;
		margin: 1rem;
		display: grid;
		gap: 1rem;
	}

	.search-results-wrapper {
		grid-area: results;
		overflow: auto;
	}

	@media (max-width: 767px) {
		.search-grid {
			max-height: 100%;
			grid-template-rows: auto min-content;
			grid-template-areas:
				'results'
				'search';
		}
		.search-results-wrapper {
			overflow: overlay;
		}
	}
</style>
