<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LocationsMenu from '$lib/Locations/LocationsMenu.svelte';
</script>

<Shell title="Locations">
	<ContentPane padding={0}>
		<LocationsMenu />
	</ContentPane>
</Shell>
