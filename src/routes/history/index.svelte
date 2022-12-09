<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import { getStories } from '$lib/Stories/Store';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { onMount } from 'svelte';
	const loadStories = getStories();
	let stories;
	onMount(async () => {
		stories = await loadStories;
	});
	function onItemSelected(item:any) {
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
