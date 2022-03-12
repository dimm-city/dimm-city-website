<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import StoryViewer from '$lib/Stories/StoryViewer.svelte';
	import StoryMenu from '$lib/Stories/StoryMenu.svelte';
	import { page } from '$app/stores';
	import { showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/ContentPane.svelte';

	const defaultStory = `/stories/${$page.params.slug || 'none'}.html`;
	let viewer;
	$showMenu = false;
</script>

<Shell title="Stories">
	<ContentPane>
		<StoryViewer story={defaultStory} bind:this={viewer} />
	</ContentPane>
	<StoryMenu slot="menu" {viewer} />
</Shell>
