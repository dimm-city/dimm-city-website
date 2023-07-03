<script>
	import { config } from '$lib/Shared/config';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';

	const endpoint = config.apiBaseUrl + '/journal-entries';
	/**
	 * @type {string}
	 */
	let searchText;

	$: query = {
		fields: ['title', 'slug', 'shortDescription', 'type'],
		filters: {
			$or: [
				{
					title: {
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

<Shell title="Founder Journals" fullscreen={false}>
	<ContentPane padding={0}>
		<SearchPage {query} {endpoint} autoLoad={true}>
			<div class="search-container" slot="search" let:resultsComponent>
				<div data-augmented-ui class="aug-input">
					<!-- <i class="bi bi-gear" /> -->
					<input
						bind:value={searchText}
						type="text"
						placeholder="Search the founder journals..."
						on:keyup={resultsComponent.search}
					/>
					<i class="bi bi-search" />
				</div>
			</div>
			<svelte:fragment slot="result" let:result>
				<MenuItem
					icon="bi-book"
					url={`/journal-entries/${result.attributes.slug}`}
					title={result.attributes.title}
					description={result.attributes.shortDescription}
				/>
			</svelte:fragment>
		</SearchPage>
	</ContentPane>
</Shell>
