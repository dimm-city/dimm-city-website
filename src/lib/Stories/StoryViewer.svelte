<script lang="ts">
	import { showMenu } from '$lib/ShellStore';
	export let story = '';
	export function selectStory(story) {
		loadStory(story);	
	}

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

	window['exitStory'] = exitStory;
</script>

<iframe title="story" id="story" src={story} on:load={storyLoaded} />

<style>
	iframe {
		width: 100%;
		height: 100%;
		clip-path: inherit;
		border: 0;
	}
</style>
