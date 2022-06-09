<script context="module">
	export const prerender = false;
</script>

<script>
	import Shell from '$lib/Shell.svelte';

	import { page } from '$app/stores';
	import { districts, showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import LocationsMenu from '$lib/Locations/LocationsMenu.svelte';
import Menu from '$lib/Components/Menu/Menu.svelte';

	let slug = $page.params.slug;

	$: district = $districts.find((d) => d.slug == slug) || {name: ''};
	$showMenu = false;
</script>

<Shell title="{district.name}">
	<ContentPane padding={0} scrollable={false}>
		<div>
			{district.name}
		</div>
	</ContentPane>	
	<Menu slot="menu">
		<LocationsMenu />
	</Menu>
</Shell>
