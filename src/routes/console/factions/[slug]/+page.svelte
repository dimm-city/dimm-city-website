<script>
	import FactionView from '$lib/Factions/FactionView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';

	/** @type {DC.Faction}*/
	export let data;
</script>

<Shell title={data.attributes?.name} fullscreen={false}>
	<ContentPane padding={3}>
		<FactionView item={data} />
	</ContentPane>
</Shell>
