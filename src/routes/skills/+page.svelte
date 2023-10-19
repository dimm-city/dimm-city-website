<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';

	export let data;

	let query = {};
	const endpoint = '/dimm-city/skill-trees';
</script>

<Shell title="Skill Trees">
	<SearchPage {endpoint} initialData={data}>
		<svelte:fragment slot="result" let:result>
			<MenuItem url={`/skills/${result.attributes.slug}`}>
				<DefaultItemResult
					icon="bi-tools"
					subtitle={result.attributes.type}
					item={result.attributes}
				/>
			</MenuItem>
		</svelte:fragment>
	</SearchPage>
</Shell>
