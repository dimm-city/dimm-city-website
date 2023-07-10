<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';

	export let data;
	const endpoint = '/dimm-city/locations';
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

<Shell title="Locations">
	<SearchPage {query} {endpoint} initialData={data}>
		<div class="search-container" slot="search" let:resultsComponent>
			<div data-augmented-ui class="aug-input">
				<!-- <i class="bi bi-gear" /> -->
				<input
					bind:value={searchText}
					type="text"
					placeholder="Search dimm city locations..."
					on:keyup={resultsComponent.search}
				/>
				<i class="bi bi-search" />
			</div>
		</div>
		<svelte:fragment slot="result" let:result>
			<MenuItem
				icon="bi-map"
				url={`/locations/${result.attributes.slug}`}
				title={result.attributes.name}
				description={result.attributes.shortDescription ?? ''}
			/>
		</svelte:fragment>
	</SearchPage>
</Shell>
