<script>
	import ItemView from '$lib/Shared/Components/Views/ItemView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
    /**
	 * @type {DC.Item}
	 */
	export let data;
</script>

<Shell title={data.attributes?.name} fullscreen={false}>
	<ContentPane padding={3}>
		<ItemView item={data.attributes} />
	</ContentPane>
</Shell>
