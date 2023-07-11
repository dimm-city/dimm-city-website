<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';

	export let data;
	const endpoint = '/dimm-city/locations';

</script>

<Shell title="Locations">
	<SearchPage {endpoint} initialData={data}>		
		<svelte:fragment slot="result" let:result>
			<MenuItem
				icon="bi-map"
				url={`/locations/${result.attributes.slug}`}
				title={result.attributes.name}
				description={result.attributes.shortDescription ?? ''}
			/>
		</svelte:fragment>
	</SearchPage>
</Shell>
