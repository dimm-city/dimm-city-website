<script>
	import Article from '$lib/Shared/Components/Article.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';

	/** @type {DC.Location}*/
	export let data;
</script>

<Shell title={data.attributes?.name} titleUrl="/locations">
	<ContentPane padding={2} scrollable={true}>
		<div class="location">
			<Article model={data} />
		</div>
	</ContentPane>
</Shell>

<style>
	.location{
		--dc-image-aspect-ratio: 4/4;
	}
</style>