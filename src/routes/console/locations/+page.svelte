<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	export let data;
	const endpoint = '/dimm-city/locations';
</script>

<Shell title="Locations">
	<SearchPage {endpoint} initialData={data} itemResultBaseUrl="/console/locations" />
</Shell>
