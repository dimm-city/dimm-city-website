<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';

	export let data;
</script>

<Shell title="Specialties">
	<SearchPage
		initialData={data}
		endpoint={'/dimm-city/specialty'}
		itemResultBaseUrl="/specialties"
		searchPlaceholder="Search dimm city specialties"
	/>
</Shell>
