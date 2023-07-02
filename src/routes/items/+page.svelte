<script>
	import ItemResult from '$lib/Items/ItemResult.svelte';
	import { config } from '$lib/Shared/config';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';

	const endpoint = config.apiBaseUrl + '/items';
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
	<ContentPane padding={0}>
		<SearchPage {query} {endpoint}>
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
				<MenuItem url={`/archive/${result.attributes.slug}`}>
					<ItemResult item={result.attributes} />
				</MenuItem>
			</svelte:fragment>
		</SearchPage>
	</ContentPane>
</Shell>
