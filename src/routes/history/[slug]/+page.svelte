<script>
	import HistoricalEventView from '$lib/HistoricalEvents/HistoricalEventView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';

	/** @type {DC.HistoricalEvent}*/
	export let data;
</script>

<Shell title={data.attributes?.name} fullscreen={false}>
	<ContentPane padding={3}>
		<HistoricalEventView item={data} />
	</ContentPane>
</Shell>
