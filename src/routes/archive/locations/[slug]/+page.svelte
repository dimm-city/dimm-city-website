<script>
	import ViewLocation from '$lib/Locations/ViewLocation.svelte';
	import { page } from '$app/stores';
</script>

<ViewLocation slug={$page.params.slug} />
