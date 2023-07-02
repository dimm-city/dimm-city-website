<script lang="ts">
	import { searchText } from '$lib/Shared/Stores/ShellStore';
	import type { PageData } from './$types';
	export let data: PageData;
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import { searchArchive } from '$lib/Archive/getArchiveItems';
	import { onMount } from 'svelte';
	import Select from 'svelte-select';

	let searchResults: ArrayLike<any> = [];
	let selectedItem: any;
	let query: Promise<any>;
	let selectedOptions = [];
	let searchTypes = ['all'];

	let options = [
		{
			id: 'location',
			name: 'Locations'
		},
		{
			id: 'specialty',
			name: 'Specialties'
		},
		{
			id: 'journalEntry',
			name: 'Journals'
		}
	];

	onMount(async () => {
		query = new Promise(async (resolve) => {
			searchResults = await searchArchive($searchText);
			resolve(searchResults);
		});
	});
	function onItemSelected(e: CustomEvent<any>) {
		let item = e.detail;

		document.location = `/archive/${item.type}-${item.id}`;
	}
	$: if (selectedOptions?.length > 0) {
		searchTypes = selectedOptions?.map((o) => o.id) ?? ['all'];
	} else {
		searchTypes = ['all'];
	}

	function search() {
		if ($searchText || searchTypes?.length > 0) {
			searchArchive($searchText, searchTypes).then((data) => (searchResults = [...data]));
		} else {
			searchArchive('', searchTypes).then((data) => (searchResults = [...data]));
		}
	}

	function getIconByType(itemType: string) {
		if (itemType == 'journalEntry') return ' bi-file-text';
		if (itemType == 'specialty') return ' bi-person-fill';
		if (itemType == 'location') return ' bi-map-fill';
		if (itemType == 'citizen') return ' bi-person-fill';
		if (itemType == 'item') return '';
	}
</script>

<Shell title="Dimm City Archive" fullscreen={false}>
	<ContentPane padding={0}>
		<div class="archive-grid">			
			<div class="results-wrapper">
				<FlexMenu
					on:itemSelected={(e) => onItemSelected(e)}
					bind:selectedItem
					data={searchResults}
					{query}
				>
					<svelte:fragment let:item slot="item-header">
						<div class="title-container">
							<i class="bi {item.icon || getIconByType(item.type)} text-light" />
							{item.name}
							{item.type}
						</div>
					</svelte:fragment>
					<svelte:fragment let:item slot="subtitle">
						<div />
					</svelte:fragment>
					<div slot="description" let:item>
						<div>{item.description?.substring(0, 50)}</div>
					</div>
				</FlexMenu>
			</div>
			<div class="archive-wrapper">
				<div>
					<input
						type="text"
						placeholder="Search archive"
						bind:value={$searchText}
						on:change={search}
					/>
				</div>
				<div class="aug-select">
					<Select
						loadOptions={() => new Promise((resolve) => resolve(options))}
						placeholder="Filter results by type"
						label="name"
						itemId="id"
						multiple={true}
						hideEmptyState={true}						
						on:change={search}
						on:input={search}
						bind:value={selectedOptions}
					>
						<div slot="selection" let:selection>
							<span>{selection.name ?? selection.attributes?.name ?? 'Unknown'}</span>
						</div>
						<div slot="item" let:item let:index>
							<span>{item.name ?? item.attributes?.name ?? 'Unknown'}</span>
						</div>
					</Select>
				</div>
			</div>
		</div>
	</ContentPane>
</Shell>

<style>
	.archive-grid {
		display: grid;
		grid-template-rows: min-content auto;
		grid-template-areas:
			'search'
			'results';
		margin-inline: 2rem;
		overflow: hidden;
	}
	.archive-wrapper {
		grid-area: search;
		margin-block: 0.5rem;
		display: grid;
		gap: 1rem;
	}

	.results-wrapper {
		grid-area: results;
		overflow: overlay;
	}
	.title-container i {
		margin-right: 0.25rem;
	}

	@media (max-width: 767px) {
		.archive-grid {
			max-height: 100%;
			grid-template-rows: auto min-content;
			grid-template-areas:
				'results'
				'search';
		}
	}
</style>
