<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import StoryViewer from '$lib/Stories/StoryViewer.svelte';
	import StoryMenu from '$lib/Stories/StoryMenu.svelte';
	import { page } from '$app/stores';
	import { showMenu } from '$lib/ShellStore';

	const defaultStory = `/stories/${$page.params.slug || 'none'}.html`;
	let viewer;
	$showMenu = true;
</script>

<Shell title="Stories">
	<StoryViewer story={defaultStory} bind:this={viewer} />
	<StoryMenu slot="menu" {viewer} />
</Shell>
