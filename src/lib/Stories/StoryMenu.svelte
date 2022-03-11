<script lang="ts">
	import Menu from '$lib/Menu/Menu.svelte';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { getStories } from './Store';

	export let viewer;
</script>

<Menu>
	{#await getStories()}
		<span>Loading</span>
	{:then stories}
		{#each stories as story}
			<MenuItem icon={story.icon} title={story.title} on:click={() => viewer.selectStory(story.slug)}
				>{story.description}</MenuItem
			>
		{/each}
	{/await}
	<!-- <MenuItem icon="bi bi-building" title="Welcome to Dimm City" on:click={() => viewer.selectStory('introduction')}>
		An introduction to the world of Dimm City where the Sporos live
	</MenuItem>
	<MenuItem icon="bi bi-cpu-fill" title="Prologue - Scene 1" on:click={() => viewer.selectStory('prologue')}
		>compiling...</MenuItem
	>
	<MenuItem icon="bi bi-terminal" title="Prologue - Scene 2">generating...</MenuItem>
	<MenuItem icon="bi bi-safe" title="Locked">identity unknown</MenuItem> -->
</Menu>
