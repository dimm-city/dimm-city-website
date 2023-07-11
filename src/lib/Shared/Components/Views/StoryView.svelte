<script>
	import { onMount } from 'svelte';

	/** @type {string}*/
	export let story = '';

	export let indexUrl = '/stories';

	/**
	 * @param {string} story
	 */
	export function selectStory(story) {
		loadStory(story);
	}

	onMount(async () => {
		if (window !== undefined) 
			// @ts-ignore
			window.exitStory = exitStory;
	});

	/**
	 * @param {string} story
	 */
	function loadStory(story) {
		if (!story) story = 'none';
		frames[0].location = `${indexUrl}/${story}.html`;
	}

	function exitStory() {
		document.location = indexUrl;
	}

	function storyLoaded() {
		if (!story.includes('none')) {
		}
	}
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
