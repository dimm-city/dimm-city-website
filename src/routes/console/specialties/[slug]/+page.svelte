<script>
	import Article from '$lib/Shared/Components/Article.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	/**
	 * @type {DC.Specialty}
	 */
	export let data;
</script>

<Shell title={data.attributes.name} titleUrl="/console/specialties">
	<ContentPane padding={2} scrollable={true}>
		<Article model={data} imageAug="tl-clip tr-clip-y br-clip bl-clip-y" />
	</ContentPane>
</Shell>
