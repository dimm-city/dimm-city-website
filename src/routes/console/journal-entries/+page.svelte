<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';

	/** @type {DC.JournalEntry}*/
	export let data;
</script>

<Shell title="Founder Journals">
	<SearchPage
		initialData={data}
		endpoint="/dimm-city/journal-entries"
	>
		<svelte:fragment slot="result" let:result>
			<MenuItem
				icon="bi-book"
				url={`/journal-entries/${result.attributes.slug}`}
				title={result.attributes.name ?? 'Unknown'}
				description={result.attributes.shortDescription}
			/>
		</svelte:fragment>
	</SearchPage>
</Shell>
