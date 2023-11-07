<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';

	export let data;
</script>

<Shell title="History">
	<SearchPage 
		initialData={data}
		endpoint={'/dimm-city/historical-events'}
		itemResultBaseUrl="/console/history"
		searchPlaceholder="Search dimm city history" />
</Shell>