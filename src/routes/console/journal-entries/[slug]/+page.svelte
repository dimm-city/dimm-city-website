<script>
	import Article from '$lib/Shared/Components/Article.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';

	/** @type {DC.JournalEntry}*/
	export let data;
</script>

<Shell title={data.attributes?.name ?? 'Unknown Entry'}>
	<ContentPane padding={2} scrollable={true}>
		<div class="journal-entry">
			<Article model={data} />
		</div>
	</ContentPane>
</Shell>

<style>
	.journal-entry {
		--dc-image-aspect-ratio: 4/3;
	}
</style>
