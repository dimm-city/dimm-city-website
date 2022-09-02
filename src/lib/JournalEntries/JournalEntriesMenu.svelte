<script>	
	import FlexMenu from '$lib/Components/Menu/FlexMenu.svelte';
	import { formatDate } from '$lib/Shared/FormatFunctions';
	import { showMenu } from '$lib/Shared/ShellStore';
	import { onMount } from 'svelte';
	import { getJournalEntries } from './getJournalEntries';

	export let selectedItem = '';
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
		selectedItem = item.slug;
		$showMenu = false;
		return true;
	}
</script>

<FlexMenu data={journalEntries} {query} on:itemSelected={selectItem}>
	<svelte:fragment slot="subtitle" let:item>
		<div><small>&thickapprox; {formatDate(item.recordedAt)}</small></div>
	</svelte:fragment>
</FlexMenu>
