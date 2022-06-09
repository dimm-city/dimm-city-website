<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import LocationsMenu from '$lib/Locations/LocationsMenu.svelte';
	$showMenu = true;
</script>

<Shell title="Locations" showMenuButton={false}>
	<ContentPane>
		<Menu />
	</ContentPane>
	<Menu slot="menu">
		<LocationsMenu />
	</Menu>
</Shell>
