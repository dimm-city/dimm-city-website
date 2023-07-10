<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';

	export let data;

	const endpoint = '/dimm-city/items';
	/**
	 * @type {string}
	 */
	let searchText;

	$: query = {
		fields: ['name', 'slug', 'shortDescription', 'type'],
		filters: {
			$or: [
				{
					name: {
						$containsi: searchText
					}
				},
				{
					description: {
						$containsi: searchText
					}
				}
			]
		}
	};
</script>

<Shell title="Items" fullscreen={false}>
	<SearchPage {query} {endpoint} initialData={data}>
		<div class="search-container" slot="search" let:resultsComponent>
			<div data-augmented-ui class="aug-input">
				<!-- <i class="bi bi-gear" /> -->
				<input
					bind:value={searchText}
					type="text"
					placeholder="Search items..."
					on:keyup={resultsComponent.search}
				/>
				<i class="bi bi-search" />
			</div>
		</div>
		<svelte:fragment slot="result" let:result>
			<MenuItem url={`/items/${result.attributes.slug}`}>
				<DefaultItemResult
					icon="bi-tools"
					subtitle={result.attributes.type}
					item={result.attributes}
				/>
			</MenuItem>
		</svelte:fragment>
	</SearchPage>
</Shell>
