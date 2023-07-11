<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';

	export let data;
</script>

<Shell title="Stories">
	<SearchPage 
		initialData={data}
		endpoint={'/dimm-city/stories'}
		itemResultBaseUrl="/stories"
		searchPlaceholder="Search dimm city stories" />
</Shell>