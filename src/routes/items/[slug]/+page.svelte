<script>
	import ItemView from '$lib/Items/ItemView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
    /**
	 * @type { {id: Number, attributes: { name: any; type: any; shortDescription: any; imageUrl: any; modelUrl: any; videoUrl: any; description: any; }}}
	 */
	export let data;
</script>

<Shell title={data.attributes.name} fullscreen={false}>
	<ContentPane padding={3}>
		<ItemView item={data.attributes} />
	</ContentPane>
</Shell>
