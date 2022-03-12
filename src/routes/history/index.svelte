<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { showMenu } from '$lib/ShellStore';
	import { getStories } from '$lib/Stories/Store';
	$showMenu = true;

	const loadStories = getStories();
</script>

<Shell title="History">
	<div class="container">
		<Menu>
			{#await loadStories}
				<span>Loading</span>
			{:then stories}
				{#each stories as story}
					<MenuItem icon={story.icon} title={story.title} url="/history/{story.slug}">{story.description}</MenuItem>
				{/each}
			{/await}
		</Menu>
	</div>
	<Menu slot="menu">
		{#await loadStories}
			<span>Loading</span>
		{:then stories}
			{#each stories as story}
				<MenuItem icon={story.icon} title={story.title} url="/history/{story.slug}">{story.description}</MenuItem>
			{/each}
		{/await}
	</Menu>
</Shell>


