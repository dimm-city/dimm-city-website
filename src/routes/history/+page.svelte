<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import { getStories } from '$lib/Stories/Store';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { onMount } from 'svelte';
	const loadStories = getStories();
	
	/**
	 * @type {({ slug: string; name: string; description: string; icon: string; disabled?: undefined; } | { slug: string; name: string; description: string; icon: string; disabled: boolean; })[]}
	 */
	let stories; // ({ slug: string; name: string; description: string; icon: string; disabled?: undefined; } | { slug: string; name: string; description: string; icon: string; disabled: boolean; })[];
	onMount(async () => {
		stories = await loadStories;
	});
	/**
	 * @param {{ detail: any; }} item
	 */
	function onItemSelected(item) {
		let selectedItem = item.detail;
		document.location = `/history/${selectedItem.slug}`;
		return true;
	}
</script>

<Shell title="History">
	<ContentPane
		><FlexMenu query={loadStories} data={stories} on:itemSelected={onItemSelected}>
			
		</FlexMenu>
	</ContentPane>
</Shell>
