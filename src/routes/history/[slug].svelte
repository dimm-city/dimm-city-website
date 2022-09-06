<script lang="ts">
	import Shell from '$lib/Components/NewShell.svelte';
	import StoryViewer from '$lib/Stories/StoryViewer.svelte';
	import { page } from '$app/stores';
	import ContentPane from '$lib/Components/ContentPane.svelte';

	const defaultStory = `/stories/${$page.params.slug || 'none'}.html`;
	let viewer;
</script>

<Shell title="History">
	<ContentPane padding={0} scrollable={false}>
		<StoryViewer story={defaultStory} bind:this={viewer} />
	</ContentPane>
</Shell>
