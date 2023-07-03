<script>
	import { config } from '$lib/Shared/config';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';

	const endpoint = config.apiBaseUrl + '/locations';
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

<Shell title="Locations" fullscreen={false}>
	<ContentPane padding={0}>
		<SearchPage {query} {endpoint} autoLoad={true}>
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
					description={result.attributes.shortDescription ?? ""}
				/>
			</svelte:fragment>
		</SearchPage>
	</ContentPane>
</Shell>
