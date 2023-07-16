<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';

	export let data;
	let query = {
		fields: ['name', 'tokenId', 'slug', 'shortDescription'],
		populate: ['mainImage', 'race', 'specialties']
	};
</script>

<Shell title="Citizens">
	<SearchPage
		bind:query
		initialData={data}
		endpoint={'/dimm-city/characters'}
		itemResultBaseUrl="/citizens"
	>
		<svelte:fragment slot="result" let:result>
			<slot name="result" {result}>
				<MenuItem url={`citizens/${result.attributes.tokenId}`}>
					<DefaultItemResult item={result.attributes} icon="bi-shield-lock" />
				</MenuItem>
			</slot>
		</svelte:fragment>
	</SearchPage>
</Shell>
