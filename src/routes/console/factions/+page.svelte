<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';

	export let data;
</script>

<Shell title="Factions">
	<SearchPage 
		initialData={data}
		endpoint={'/dimm-city/factions'}
		itemResultBaseUrl="/console/factions"
		searchPlaceholder="Search dimm city factions" />
</Shell>