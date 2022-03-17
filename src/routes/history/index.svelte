<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { showMenu } from '$lib/ShellStore';
	import { getStories } from '$lib/Stories/Store';
	import ContentPane from '$lib/ContentPane.svelte';
	$showMenu = true;

	const loadStories = getStories();
</script>

<Shell title="History">
	<ContentPane>
		<Menu>
			{#await loadStories}
				<span>Loading</span>
			{:then stories}
				{#each stories as story}
					<MenuItem disabled={story.disabled} icon={story.icon} title={story.title} url="/history/{story.slug}" description={story.description} />
				{/each}
			{/await}
		</Menu>
	</ContentPane>
	<Menu slot="menu">
		{#await loadStories}
			<span>Loading</span>
		{:then stories}
			{#each stories as story}
				<MenuItem disabled={story.disabled} icon={story.icon} title={story.title} url="/history/{story.slug}" description={story.description} />
			{/each}
		{/await}
	</Menu>
</Shell>
