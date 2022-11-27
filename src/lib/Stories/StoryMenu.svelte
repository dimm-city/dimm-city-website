<script lang="ts">
	import Menu from '$lib/Shared/Components/Menu/Menu.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import { getStories } from './Store';
	export let viewer;
</script>

<Menu>
	{#await getStories()}
		<span>Loading</span>
	{:then stories}
		{#each stories as story}
			<MenuItem
				icon={story.icon}
				title={story.title}
				disabled={story.disabled}
				on:click={() => viewer.selectStory(story.slug)}
				description={story.description} />
		{/each}
	{/await}
</Menu>
