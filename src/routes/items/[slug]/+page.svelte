<script>
	import ItemView from '$lib/Shared/Components/Views/ItemView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
    /**
	 * @type {DC.Item}
	 */
	export let data;
</script>

<Shell title={data.attributes?.name} titleUrl="/items">
	<ContentPane padding={3}>
		<ItemView item={data} />
	</ContentPane>
</Shell>
