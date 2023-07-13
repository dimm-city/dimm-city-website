<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import StoryView from '$lib/Stories/StoryView.svelte';
	import { page } from '$app/stores';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';

	const defaultStory = `/stories/${$page.params.slug || 'none'}.html`;

	/** @type {DC.BaseEntity}*/
	export let data;
	let viewer;
</script>

<Shell title={data.attributes.name}>
	<ContentPane padding={0} scrollable={false}>
		<StoryView story={defaultStory} bind:this={viewer} indexUrl="/stories" />
	</ContentPane>
</Shell>
