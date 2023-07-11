<script>
	import RaceView from '$lib/Shared/Components/Views/RaceView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
    /**
	 * @type {DC.Race}
	 */
	export let data;
</script>

<Shell title={data.attributes.name} fullscreen={false} titleUrl="/races">
	<ContentPane padding={3}>
		<RaceView race={data} />
	</ContentPane>
</Shell>
