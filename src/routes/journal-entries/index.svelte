<script lang="ts">
	import Shell from '$lib/Components/NewShell.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import JournalEntriesMenu from '$lib/JournalEntries/JournalEntriesMenu.svelte';
	$showMenu = true;
</script>

<Shell title="Journals" showMenuButton={false}>
	<ContentPane>
		<JournalEntriesMenu />
	</ContentPane>
	<JournalEntriesMenu slot="menu" />
</Shell>
