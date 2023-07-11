<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';

	/** @type {DC.JournalEntry}*/
	export let data;
</script>

<Shell title="Founder Journals">
	<SearchPage
		initialData={data}
		endpoint="/dimm-city/journal-entries"
		searchPlaceholder="Search the founder journals..."
	>
		<svelte:fragment slot="result" let:result>
			<MenuItem
				icon="bi-book"
				url={`/journal-entries/${result.attributes.slug}`}
				title={result.attributes.title}
				description={result.attributes.shortDescription}
			/>
		</svelte:fragment>
	</SearchPage>
</Shell>
