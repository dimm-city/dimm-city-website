<script>
	import Dialog from '$lib/Shared/Components/Dialog.svelte';
	import Markdown from '$lib/Shared/Components/Markdown.svelte';

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
		<Markdown
			text={selectedItem?.item?.data?.attributes?.description ?? selectedItem?.description}
		/>
	</div>
</Dialog>
