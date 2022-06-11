<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import { districts, showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import LocationsMenu from '$lib/Locations/LocationsMenu.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { onMount } from 'svelte';
	import { getLocation } from './getLocationBySlug';
	import TextContainer from '$lib/Components/TextContainer.svelte';
	import Image from '$lib/Components/Image.svelte';
	import { Location } from './Location';
	import { marked } from 'marked';
	export let slug;
	$showMenu = false;
	let location = new Location();
	let html = '';
	onMount(async () => {
		location = await getLocation(slug);
		html = marked.parse(location.description);
	});
</script>

<style>
	.location-grid {
		display: grid;
		padding: 3rem;
		height: 100%;
		grid-template-rows: min-content max-content;
		margin-bottom: 20rem;
	}

	.main-image {
		min-height: 300px;
		float: left;
		margin-inline-end: 0.75rem;
		margin-block-end: 0.2rem;
		color: rgba(255, 255, 255, 0.35) !important;
	}
	:global(.main-image .image-wrapper) {
		color: unset !important;
	}
	:global(.main-image img, .main-image video) {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.text-area {
		height: min-content;
	}
	:global(.text-area p) {
		margin-block-start: 0;
	}
</style>

<Shell title={location.name}>
	<ContentPane padding={0} scrollable={true}>
		<div class="location-grid">
			<div class="title-area"><h1>{location.name}</h1></div>
			<article class="text-area">
				<div class="main-image">
					<Image imageUrl={location.imageUrl} title={location.name} videoUrl={location.videoUrl} 
						aug="tl-clip tr-clip br-clip bl-clip border"/>
				</div>
				<section>
					{@html html}
				</section>
			</article>
		</div>
	</ContentPane>
	<Menu slot="menu">
		<LocationsMenu />
	</Menu>
</Shell>
