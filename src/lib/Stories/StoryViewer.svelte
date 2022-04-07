<script lang="ts">
	import { showMenu } from '$lib/ShellStore';
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
		$showMenu = true;
	}

	function storyLoaded() {
		console.log('story loaded');
		if (!story.includes('none')) {
			$showMenu = false;
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
