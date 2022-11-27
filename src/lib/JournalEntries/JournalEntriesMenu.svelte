<script lang="ts">
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import { formatDate } from '$lib/Shared/FormatFunctions';
	import { searchText } from '$lib/Shared/Stores/ShellStore';
	import { filterAndSort } from '$lib/Shared/Stores/StoreUtils';
	import { onMount } from 'svelte';
	import { getJournalEntries } from './getJournalEntries';
	import { JournalEntry } from './JournalEntry';

	export let selectedItem: JournalEntry = new JournalEntry();
	let journalEntries = [];
	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			if (journalEntries?.length < 1) {
				let data = await getJournalEntries();
				if (data != null) {
					journalEntries = data;
				}
				resolve(data);
			} else resolve(journalEntries);
		});
	});
	
	$: filteredJournalEntries = filterAndSort(journalEntries, $searchText);

	function selectItem(item) {
		selectedItem = item.detail;
		document.location = `/journal-entries/${selectedItem.slug}`;
		return true;
	}
</script>

<style>
	.subtitle {
		white-space: nowrap;
	}
	@media (max-width: 500px) {
		.subtitle {
			display: none;
		}
	}
</style>

<FlexMenu data={filteredJournalEntries} {query} on:itemSelected={selectItem}>
	<svelte:fragment slot="subtitle" let:item>
		<div class="subtitle"><small>&thickapprox; {formatDate(item.recordedAt)}</small></div>
	</svelte:fragment>
</FlexMenu>
