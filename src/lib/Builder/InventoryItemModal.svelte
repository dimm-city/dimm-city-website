<script>
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import markdownit from 'markdown-it';
	import Toggle from '$lib/Shared/Components/Toggle.svelte';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Select from 'svelte-select/Select.svelte';
	import Modal from './Modal.svelte';
	import { getItems } from '$lib/Shared/Stores/getItems';
	
	let manual = true;
	const md = new markdownit();
	/**
	 * @type {DC.InventoryItem}
	 */
	export let data;
	export let show = false;

	let isSaving = false;
	export let isEditing = false;

	async function updateInventoryItem() {
		isSaving = true;
		console.log('data', data);
		isSaving = false;
		isEditing = false;
		show = false;
		modal.close();
	}

	/**
	 * @type {Modal}
	 */
	let modal;
</script>

<Modal bind:this={modal} bind:show on:close={() => (isEditing = false)}>
	<svelte:fragment slot="header">
		{#if isEditing}
			Editing Inventory Item
		{:else if data?.item.data?.attributes}
			{data.item.data.attributes.name}
		{:else if data?.text}
			{data.text}
		{:else}
			404
		{/if}
		<hr />
	</svelte:fragment>
	<div class="modal-content">
		{#if isSaving}
			<LoadingIndicator>Updating inventory...</LoadingIndicator>
		{:else if isEditing}
			<div class="modal-body">
				<Toggle bind:checked={manual} label="Manual Entry" />
				{#if manual && !data?.item?.data}
					<Input bind:value={data.text} />
				{:else}
					<div class="value aug-select">
						<Select
							loadOptions={getItems}
							placeholder="Select an item"
							label="name"
							itemId="id"
							multiple={false}
							bind:value={data.item.data}
						>
							<div slot="selection" let:selection>
								<span>{selection.name ?? selection.attributes?.name ?? 'Unknown'}</span>
							</div>
							<div slot="item" let:item let:index>
								<span>{item.name ?? item.attributes?.name ?? 'Unknown'}</span>
							</div>
						</Select>
					</div>
				{/if}
			</div>
		{:else if data?.item.data?.attributes}
			{@html md.render(data.item.data.attributes?.description ?? '')}
		{:else if data?.text}
			{data.text}
		{:else}
			<span>Not found</span>
		{/if}
	</div>
	<svelte:fragment slot="footer">
		{#if isEditing}
			<button on:click={() => updateInventoryItem()}>Save</button>
		{:else}
			<button on:click={() => (isEditing = true)}>Edit</button>
		{/if}
	</svelte:fragment>
</Modal>

<style>
	.modal-content {
		aspect-ratio: 1;
		min-height: 30ch;
		padding: 0.5rem;
	}

	.modal-body {
		display: grid;
		gap: 1rem;
	}
</style>
