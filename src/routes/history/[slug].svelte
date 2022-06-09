<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import StoryViewer from '$lib/Stories/StoryViewer.svelte';
	import StoryMenu from '$lib/Stories/StoryMenu.svelte';
	import { page } from '$app/stores';
	import { showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';

	const defaultStory = `/stories/${$page.params.slug || 'none'}.html`;
	let viewer;
	$showMenu = false;
</script>

<Shell title="History">
	<ContentPane padding={0} scrollable={false}>
		<StoryViewer story={defaultStory} bind:this={viewer} />
	</ContentPane>
	<StoryMenu slot="menu" {viewer} />
</Shell>
