<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';

	export let data;
</script>

<Shell title="Specialties">
	<SearchPage
		initialData={data}
		endpoint={'/dimm-city/specialty'}
		itemResultBaseUrl="/specialties"
	/>
</Shell>

<style>
	@media (width < 800px)
	{
		:global(.menu-item){
			--dc-menu-item-aspect-ratio: 2/1;
		}
	}
	@media (width < 600px)
	{
		:global(.menu-item){
			--dc-menu-item-aspect-ratio: 3/2;
		}
	}
	@media (width < 400px)
	{
		:global(.menu-item){
			--dc-menu-item-aspect-ratio: 1;
		}
	}


		
</style>