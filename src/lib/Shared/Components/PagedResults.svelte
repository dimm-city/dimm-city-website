<script>
	import { onMount } from 'svelte';

	import qs from 'qs';

	export let endpoint = '';
	export let query = {};
	export let autoLoad = true;

	export let page = 1;
	export let totalPages = 1;
	/**
	 * @type {any[]}
	 */
	export let results = [];
	let resultsPerPage = 10;
	$: if (resultsPerPage) page = 1;

	let loading = false;
	/**
	 * @param {{ (): Promise<void>; apply?: any; }} func
	 * @param {number | undefined} delay
	 */
	function debounce(func, delay) {
		/**
		 * @type {string | number | NodeJS.Timeout | undefined}
		 */
		let debounceTimer;
		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => func.apply(context, args), delay);
		};
	}

	/**
	 * @param {number} page
	 * @param {number} limit
	 */
	async function fetchData(page, limit) {
		const response = await fetch(
			endpoint + '?' + qs.stringify({ ...query, pagination: { page, pageSize: limit } }),
			{
				method: 'GET'
			}
		);
		const data = await response.json();
		totalPages = data.meta.pagination.pageCount;
		return data;
	}

	export const search = debounce(async () => {
		loading = true;
		const result = await fetchData(page, resultsPerPage);
		results = [...(result.data ?? [])];
		loading = false;
	}, 300);

	export async function previousPage() {
		if (page > 1) {
			page--;
			search();
			// const result = await fetchData(page, resultsPerPage);
			// results = [...results, ...(result.data ?? [])];
		}
	}
	export async function nextPage() {
		if (page < totalPages) {
			page++;
			search();
			// const result = await fetchData(page, resultsPerPage);
			// results = [...results, ...(result.data ?? [])];
		}
	}


	/**
	 * @param {{ target: { scrollTop: any; clientHeight: any; scrollHeight: any; }; }} event
	 */
	export function handleScroll(event) {
		const { scrollTop, clientHeight, scrollHeight } = event.target;
		if (scrollHeight - scrollTop === clientHeight) {
			nextPage();
		}
	}

	/**
	 * @param {{ target: { dataset: { page: any; }; }; }} event
	 */
	function handlePagination(event) {
		const temp = Number(event.target.dataset.page);
		if (temp > 0 && temp <= totalPages) {
			page = temp;
			search();
		}
	}

	onMount(() => {
		console.log('mounting paged results', autoLoad);
		if (autoLoad) search();
	});
</script>

<!-- <div class="toolbar">
	<div>
		<select class="aug-select" data-augmented-ui bind:value={resultsPerPage} on:change={search}>
			<option value={10}>10</option>
			<option value={20}>20</option>
			<option value={50}>50</option>
		</select>
	</div>

	<div class="pagination">
		{#if page > 1}
			<button data-page={page - 1} class="text-button" data-augmented-ui on:click={handlePagination}
				>Previous</button
			>
		{/if} 
		<span>Page {page} of {totalPages}</span>
		 {#if page < totalPages}
			<button data-page={page + 1} class="text-button" data-augmented-ui on:click={handlePagination}
				>Next</button
			>
		{/if} 
	</div>
</div> -->

<ul class="results-list" on:scroll={handleScroll}>
	{#if loading}
		<span>...</span>
	{:else if Array.isArray(results)}
		{#each results as result (result.id)}
			<li class="fade-in">
				<slot name="result" {result}>
					{result.attributes?.name}
				</slot>
			</li>
		{/each}
	{/if}
</ul>

<style>
	/* .toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		margin-inline: 0.5rem;
	}
	.pagination span{
		white-space: nowrap;
	} */

	.results-list {
		display: flex;
		flex-wrap: wrap;
		min-width: 300px;
		align-content: flex-start;
		justify-content: center;
		align-items: flex-start;
		padding: 0;
		margin-top: 0.25rem;
	}
	.results-list > li {
		padding-left: 0;
		flex: 1 1 350px;
		margin: 0.5rem;
		max-width: 500px;
		overflow: hidden;
	}
	ul li:before {
		content: '';
		display: none;
	}

</style>
