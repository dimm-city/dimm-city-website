<script lang="ts">
	import FlexMenu from '$lib/Components/Menu/FlexMenu.svelte';
	import { formatDate } from '$lib/Shared/FormatFunctions';
	import { showMenu } from '$lib/Shared/ShellStore';
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
					journalEntries = data.sort((a, b) => {
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						else return -1;
					});
				}
				resolve(data);
			} else resolve(journalEntries);
		});
	});

	function selectItem(item) {
		selectedItem = item.detail;
		document.location = `/journal-entries/${selectedItem.slug}`;
		$showMenu = false;
		return true;
	}
</script>
<style>
	.subtitle{
		white-space: nowrap;
	}
	@media (max-width: 500px){
		.subtitle{
			display: none;
		}
	}
</style>

<FlexMenu data={journalEntries} {query} on:itemSelected={selectItem}>
	<svelte:fragment slot="subtitle" let:item>
		<div class="subtitle"><small>&thickapprox; {formatDate(item.recordedAt)}</small></div>
	</svelte:fragment>
</FlexMenu>
