<script>
	export let data;
	import { config } from '$lib/Shared/config.js';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import CharacterResult from '$lib/Characters/CharacterResult.svelte';

	const endpoint = config.apiBaseUrl + '/characters';
	/**
	 * @type {string}
	 */
	let searchText;

	$: query = {
		fields: ['tokenId', 'name', 'vibe', 'hp', 'ap'],
		populate: {
			race: {
				fields: ['name']
			},
			specialties: {
				fields: ['name']
			}
		},
		filters: {
			$or: [
				{
					name: {
						$containsi: searchText
					}
				},
				{
					vibe: {
						$containsi: searchText
					}
				}
			]
		}
	};
</script>

<Shell title="Citizen Files" fullscreen={false}>
	<ContentPane padding={0}>
		<SearchPage {query} {endpoint} autoLoad={true}>
			<div class="search-container" slot="search" let:resultsComponent>
				<div data-augmented-ui class="aug-input">
					<!-- <i class="bi bi-gear" /> -->
					<input
						bind:value={searchText}
						type="text"
						placeholder="Search citizen files..."
						on:keyup={resultsComponent.search}
					/>
					<!-- <i class="bi bi-search" /> -->
				</div>
			</div>
			<svelte:fragment slot="result" let:result>
				<MenuItem url={`/citizens/${result.attributes.tokenId}`}>
					<CharacterResult item={result.attributes} />
				</MenuItem>
			</svelte:fragment>
		</SearchPage>
	</ContentPane>
</Shell>
