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
	export let autoLoad = false;

	let currentPage = 1;
	let totalPages = 1;
	let resultsComponent;

	// @ts-ignore
	export const search = resultsComponent?.search;
	// @ts-ignore
	export const nextPage = resultsComponent?.nextPage;
	//search-results-wrapper on:scroll={resultsComponent.handleScroll}
</script>

<div class="search-grid">
	<div class="search-results-wrapper">
		<PagedResults
			bind:this={resultsComponent}
			bind:page={currentPage}
			bind:totalPages
			{endpoint}
			{query}
			results={initialData}
			{autoLoad}
		>
			<svelte:fragment slot="result" let:result>
				<slot name="result" {result} />
			</svelte:fragment>
		</PagedResults>
	</div>
	<div class="search-form-wrapper">
		<button class="text-button" on:click={resultsComponent.previousPage}>&lt;</button>
		<slot name="search" {resultsComponent} />
		<button class="text-button" on:click={resultsComponent.nextPage}>&gt;</button>
	</div>
	<div class="search-status-wrapper">
		<small>Page {currentPage} of {totalPages}</small>
	</div>
</div>

<style>
	.search-grid {
		display: grid;
		grid-template-rows: min-content min-content auto;
		grid-template-areas:
			'search'
			'status'
			'results';
		margin-inline: 0.5rem;
		overflow: hidden;
	}
	.search-form-wrapper {
		grid-area: search;
		margin: 1rem;
		margin-bottom: 0.25rem;
		display: grid;
		grid-template-columns: min-content auto min-content;
		gap: 1rem;
		column-gap: 0.25rem;
		z-index: 2;
	}

	.search-form-wrapper button {
		color: var(--fourth-accent);
		font-size: x-large;
		padding: 0;
	}

	.search-results-wrapper {
		grid-area: results;
		display: grid;
		align-content: start;
		overflow: auto;
	}

	.search-status-wrapper {
		grid-area: status;
		display: grid;
		justify-content: center;
	}
	@media (max-width: 767px) {
		.search-grid {
			max-height: 100%;
			margin-inline: 0;
			grid-template-rows: auto min-content min-content;
			grid-template-areas:
				'results'
				'search'
				'status';
		}
		.search-results-wrapper {
			overflow: overlay;
		}

		.search-form-wrapper {
			border-top: 1px solid var(--secondary-accent);
			padding-block: 0.5rem;
		}
	}
</style>
