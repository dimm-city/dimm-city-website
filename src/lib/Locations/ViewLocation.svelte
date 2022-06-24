<script lang="ts">
	import './locations.css';
	import Shell from '$lib/Components/Shell.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
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

	$: if(slug > ""){
		getLocation(slug).then(data => location = data);
	}
</script>
<Shell title="Locations">
	<ContentPane padding={0} scrollable={true}>
		<div class="location">
			
			<Article model={location} />
		</div>
	</ContentPane>
	<Menu slot="menu">
		<LocationsMenu bind:selectedItem={slug}/>
	</Menu>
</Shell>
