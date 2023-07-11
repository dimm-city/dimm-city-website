<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';

	export let data;
</script>

<Shell title="Races">
	<SearchPage 
		initialData={data}
		endpoint={'/dimm-city/races'}
		itemResultBaseUrl="/races"
		searchPlaceholder="Search dimm city races" />
</Shell>