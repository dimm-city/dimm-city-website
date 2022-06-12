<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import { showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import LocationsMenu from '$lib/Locations/LocationsMenu.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { onMount } from 'svelte';
	import { getLocation } from './getLocationBySlug';
	import { Location } from './Location';
	import Article from '$lib/Components/Article.svelte';
	export let slug;
	$showMenu = false;
	let location = new Location();
	onMount(async () => {
		location = await getLocation(slug);
	});
</script>

<Shell title="Locations">
	<ContentPane padding={0} scrollable={true}>
		<Article model={location} />
	</ContentPane>
	<Menu slot="menu">
		<LocationsMenu />
	</Menu>
</Shell>
