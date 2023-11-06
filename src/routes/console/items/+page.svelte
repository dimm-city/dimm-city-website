<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';

	export let data;
	const endpoint = '/dimm-city/items';
</script>

<Shell title="Items">
	<SearchPage {endpoint} initialData={data}>
		<svelte:fragment slot="result" let:result>
			<MenuItem url={`/items/${result.attributes.slug}`}>
				<DefaultItemResult
					icon="bi-tools"
					subtitle={result.attributes.type}
					item={result.attributes}
				/>
			</MenuItem>
		</svelte:fragment>
	</SearchPage>
</Shell>
