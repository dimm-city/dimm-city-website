<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import LocationsMenu from '$lib/Locations/LocationsMenu.svelte';
</script>

<Shell title="Locations">
	<ContentPane>
		<LocationsMenu />
	</ContentPane>
</Shell>
