<script>
	import { config } from '$lib/Shared/config';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';

	export let data;
	const endpoint = config.apiBaseUrl + '/races';
	/**
	 * @type {string}
	 */
	let searchText;

	$: query = {
		fields: ['name', 'slug', 'shortDescription'],
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

<Shell title="Races" fullscreen={false}>
	<ContentPane padding={0}>
		<SearchPage {query} {endpoint} initialData={data.data}>
			<div class="search-container" slot="search" let:resultsComponent>
				<div data-augmented-ui class="aug-input">
					<!-- <i class="bi bi-gear" /> -->
					<input
						bind:value={searchText}
						type="text"
						placeholder="Search races..."
						on:keyup={resultsComponent.search}
					/>
					<i class="bi bi-search" />
				</div>
			</div>
			<svelte:fragment slot="result" let:result>
				<MenuItem url={`/races/${result.attributes.slug}`}>
					<DefaultItemResult item={result.attributes} icon="bi-people" />
				</MenuItem>
			</svelte:fragment>
		</SearchPage>
	</ContentPane>
</Shell>
