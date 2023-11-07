<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';

	export let data;
</script>

<Shell title="Races">
	<SearchPage 
		initialData={data}
		endpoint={'/dimm-city/races'}
		itemResultBaseUrl="/console/races" />
</Shell>