<script>
	import Dialog from '$lib/Shared/Components/Dialog.svelte';
	import markdownit from 'markdown-it';

	const md = new markdownit();
	/**
	 * @type {DC.ListItem<DC.BaseEntity> | null}
	 */
	export let selectedItem;
</script>

<Dialog show={selectedItem != null}>
	<svelte:fragment slot="header">
		{#if selectedItem?.item.data?.attributes?.name}
			{selectedItem.item.data.attributes.name}
		{:else if selectedItem?.text}
			{selectedItem.text}
		{:else}
			404
		{/if}
		<hr />
	</svelte:fragment>
	<div class="modal-content">
		{#if selectedItem?.item.data?.attributes}
			{@html md.render(selectedItem.item.data.attributes?.description ?? '')}
		{:else if selectedItem?.text}
			{@html md.render(selectedItem.description ?? '')}
		{:else}
			<span>Not found</span>
		{/if}
	</div>
</Dialog>
