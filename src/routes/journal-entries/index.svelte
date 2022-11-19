<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import JournalEntriesMenu from '$lib/JournalEntries/JournalEntriesMenu.svelte';
</script>

<Shell title="Journal Entries" enableSearch={true}>
	<ContentPane padding={0}>
		<JournalEntriesMenu />
	</ContentPane>
</Shell>
