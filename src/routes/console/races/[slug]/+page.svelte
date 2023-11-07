<script>
	import RaceView from '$lib/Races/RaceView.svelte';
	import Article from '$lib/Shared/Components/Article.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
    /**
	 * @type {DC.Race}
	 */
	export let data;
</script>

<Shell title={data.attributes.name} fullscreen={false} titleUrl="/console/races">
	
		<RaceView race={data} />

		<!-- <Article model={data} imageAug="tl-clip tr-clip-y br-clip bl-clip-y" /> -->
	
</Shell>
