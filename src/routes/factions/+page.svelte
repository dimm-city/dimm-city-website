<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';


	export let data;
	let query = {
		fields: ['name', 'slug', 'shortDescription']
	};
</script>

<Shell title="Factions">
	<SearchPage bind:query 
		initialData={data}
		endpoint={'/dimm-city/factions'}
		itemResultBaseUrl="/factions" />
</Shell>