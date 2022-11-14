<script context="module">
	export const prerender = true;
</script>

<script>
	import { page } from '$app/stores';
	import ViewJournalEntry from '$lib/JournalEntries/ViewJournalEntry.svelte';
</script>

<ViewJournalEntry slug={$page.params.slug} />
