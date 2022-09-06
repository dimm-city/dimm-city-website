<script lang="ts">
	import Shell from '$lib/Components/NewShell.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import { getStories } from '$lib/Stories/Store';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	const loadStories = getStories();
</script>

<Shell title="History">
	<ContentPane
		><Menu>
			{#await loadStories}
				<div class="loading-indicator fade-in" data-augmented-ui>
					<div>Locating historical data...</div>
				</div>
			{:then stories}
				{#each stories as story}
					<MenuItem
						disabled={story.disabled}
						icon={story.icon}
						title={story.title}
						url="/history/{story.slug}"
						description={story.description}
					/>
				{/each}
			{/await}
		</Menu>
	</ContentPane>
</Shell>
