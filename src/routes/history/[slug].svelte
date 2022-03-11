<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import StoryViewer from '$lib/Stories/StoryViewer.svelte';
	import { page } from '$app/stores';

	const defaultStory = `/stories/${$page.params.slug || 'none'}.html`;
	let viewer;
</script>

<Shell title="Stories">
	<StoryViewer story={defaultStory}  bind:this={viewer}/>
	<Menu slot="menu">
		<MenuItem icon="bi bi-building" title="Welcome to Dimm City" url="/history/introduction" on:click={() => viewer.selectStory('introduction')}>
			An introduction to the world of Dimm City where the Sporos live
		</MenuItem>
		<MenuItem icon="bi bi-cpu-fill" title="Prologue - Scene 1" on:click={() => viewer.selectStory('prologue/Prologue')}>compiling...</MenuItem>
		<MenuItem icon="bi bi-terminal" title="Prologue - Scene 2">generating...</MenuItem>
		<MenuItem icon="bi bi-safe" title="Locked">identity unknown</MenuItem>
	</Menu>
</Shell>
