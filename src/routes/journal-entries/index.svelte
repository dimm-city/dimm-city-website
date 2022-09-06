<script lang="ts">
	import Shell from '$lib/Components/NewShell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import JournalEntriesMenu from '$lib/JournalEntries/JournalEntriesMenu.svelte';
</script>

<Shell title="Journal Entries" enableSearch={true}>
	<ContentPane>
		<JournalEntriesMenu />
	</ContentPane>
</Shell>
