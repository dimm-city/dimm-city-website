<script>
	import { config } from '$lib/Shared/config';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';
	import PagedResults from '$lib/Shared/Components/PagedResults.svelte';
	/**
	 * @type {?any}
	 */
	export let query = {
		populate: 'mainImage'
	};
	export let endpoint = config.apiBaseUrl + '/dimm-city/items';
	export let itemResultBaseUrl = '';
	/**
	 * @type {any}
	 */
	export let initialData = {};
	export let autoLoad = false;
	export let searchPlaceholder = 'Search entries';

	let searchText = "";
	let currentPage = initialData?.meta?.pagination?.page ?? 1;
	let totalPages = initialData?.meta?.pagination?.pageCount ?? 1;
	let resultsComponent;

	// @ts-ignore
	export const search = resultsComponent?.search;
	// @ts-ignore
	export const nextPage = resultsComponent?.nextPage;
	//search-results-wrapper on:scroll={resultsComponent.handleScroll}


	$: query = {
		...query,
		filters: {
			$or: [
				{
					name: {
						$containsi: searchText ?? ""
					}
				}
			]
		}
	};
</script>

	<ContentPane padding={0}>
		<div class="search-grid">
			<div class="search-results-wrapper">
				<PagedResults
					bind:this={resultsComponent}
					bind:page={currentPage}
					bind:totalPages
					endpoint={`${config.apiBaseUrl}${endpoint}`}
					{query}
					results={initialData?.data}
					{autoLoad}
				>
					<svelte:fragment slot="result" let:result>
						<slot name="result" {result}>
							<MenuItem url={`${itemResultBaseUrl}/${result.attributes.slug}`}>
								<DefaultItemResult item={result.attributes} icon="bi-shield-lock" />
							</MenuItem>
						</slot>
					</svelte:fragment>
				</PagedResults>
			</div>
			<div class="search-form-wrapper">
				<button class="text-button" on:click={resultsComponent.previousPage}>&lt;</button>
				<slot name="search" {resultsComponent}>
					<div class="search-container">
						<div data-augmented-ui class="aug-input">
							<i class="bi bi-gear" />
							<input
								bind:value={searchText}
								type="text"
								placeholder="{searchPlaceholder}"
								on:keyup={resultsComponent.search}
							/>
							<i class="bi bi-search" />
						</div>
					</div>
				</slot>
				<button class="text-button" on:click={resultsComponent.nextPage}>&gt;</button>
			</div>
			<div class="search-status-wrapper">
				<small>Page {currentPage} of {totalPages}</small>
			</div>
		</div>
	</ContentPane>

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
