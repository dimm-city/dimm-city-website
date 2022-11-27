<script lang="ts">
	import { onMount } from 'svelte';
	export let story = '';
	export function selectStory(story) {
		loadStory(story);
	}

	onMount(async () => {
		if (window !== undefined) window['exitStory'] = exitStory;		
	});
	function loadStory(story) {
		if (!story) story = 'none';
		frames[0].location = `/stories/${story}.html`;
	}

	function exitStory() {
		document.location = '/history'
	}

	function storyLoaded() {
		if (!story.includes('none')) {
		}
	}
</script>

<style>
	iframe {
		width: 100%;
		height: 100%;
		clip-path: inherit;
		border: 0;
	}
</style>

<iframe title="story" id="story" src={story} on:load="{storyLoaded}"/>
