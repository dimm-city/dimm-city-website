<script>
	import RaceView from '$lib/Shared/Components/Views/RaceView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
    /**
	 * @type { {id: Number, attributes: { name: any; type: any; shortDescription: any; imageUrl: any; modelUrl: any; videoUrl: any; description: any; }}}
	 */
	export let data;
</script>

<Shell title={data.attributes.name} fullscreen={false} titleUrl="/races">
	<ContentPane padding={3}>
		<RaceView race={data.attributes} />
	</ContentPane>
</Shell>
