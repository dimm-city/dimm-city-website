<script>
	import { onMount } from 'svelte';

	import qs from 'qs';

	export let endpoint = '';
	export let query = {};
	export let autoLoad = true;

	export let page = 1;
	export let totalPages = 1;

	export let jwt = '';

	/**
	 * @type {any[]}
	 */
	export let results = [];
	let resultsPerPage = 25;
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
		const options = {
			method: 'GET'
		};
		if (jwt) {
			// @ts-ignore
			options.headers = {Authorization : `Bearer ${jwt}` };
		}

		const response = await fetch(
			endpoint + '?' + qs.stringify({ ...query, pagination: { page, pageSize: limit } }),
			options
		);

		const data = await response.json();
		if (data.error) console.log('Error fetching data', data.error);
		totalPages = data.pagination?.pageCount ?? 1;
		return data;
	}

	export const search = debounce(async () => {
		loading = true;
		page = 1;
		const result = await fetchData(page, resultsPerPage);
		results = [...(result.data ?? [])];
		loading = false;
	}, 300);

	export async function previousPage() {
		if (page > 1) {
			page--;
			const result = await fetchData(page, resultsPerPage);
			results = [...(result.data ?? [])];
		}
	}
	export async function nextPage() {
		if (page < totalPages) {
			page++;
			const result = await fetchData(page, resultsPerPage);
			results = [...(result.data ?? [])];
		}
	}

	/**
	 * @param {{ target: { scrollTop: any; clientHeight: any; scrollHeight: any; }; }} event
	 */
	export async function handleScroll(event) {
		const { scrollTop, clientHeight, scrollHeight } = event.target;
		if (scrollHeight - scrollTop === clientHeight) {
			const result = await fetchData(page, resultsPerPage);
			results = [...results, ...(result.data ?? [])];
		}
	}

	/**
	 * @param {{ target: { dataset: { page: any; }; }; }} event
	 */
	// function handlePagination(event) {
	// 	const temp = Number(event.target.dataset.page);
	// 	if (temp > 0 && temp <= totalPages) {
	// 		page = temp;
	// 		search();
	// 	}
	// }

	onMount(() => {
		// console.log('mounting paged results', autoLoad);
		if (autoLoad) search();
	});
</script>

<ul class="results-list" on:scroll={handleScroll}>
	{#if loading}
		<span>...</span>
	{:else if Array.isArray(results) && results.length > 0}
		{#each results as result (result.id)}
			<li class="fade-in">
				<slot name="result" {result}>
					{result.attributes?.name}
				</slot>
			</li>
		{/each}
	{:else}
		<span>No results found</span>
	{/if}
</ul>

<style>
	.results-list {
		display: flex;
		flex-wrap: wrap;
		min-width: 300px;
		align-content: flex-start;
		justify-content: center;
		align-items: flex-start;
		padding: 0;
		gap: 1em;
	}
	.results-list > li {
		padding-left: 0;
		flex: 1 1 350px;
		margin: 0.5rem;
		max-width: 500px;
		overflow: hidden;
	}
	.results-list > li:before {
		content: '';
		display: none;
	}
</style>
