<script>
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import markdownit from 'markdown-it';
	import Toggle from '$lib/Shared/Components/Toggle.svelte';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Select from 'svelte-select/Select.svelte';
	import Modal from './Modal.svelte';
	import { getItems } from '$lib/Shared/Stores/getItems';
	/**
	 * @type {DC.InventoryItem}
	 */
	export let data;
	export let show = false;

	let isSaving = false;
	export let isEditing = false;
	let manual = true;
	const md = new markdownit();

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

<Modal bind:this={modal} bind:show>
	<div>
		{#if isSaving}
			<LoadingIndicator>Updating inventory...</LoadingIndicator>
		{:else if isEditing}
			<div class="modal-header">Edit Inventory Item</div>
			<hr />
			<Toggle bind:checked={manual} />
			{#if manual && !data?.item?.data}
				<Input bind:value={data.text} />
			{:else}
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
			{/if}
			<button on:click={() => updateInventoryItem()}>Save</button>
		{:else if data?.item.data?.attributes}
			<div class="modal-header">
				<div>{data.item.data.attributes.name}</div>
			</div>
			<hr />
			<div>{@html md.render(data.item.data.attributes?.description ?? '')}</div>
			<button on:click={() => (isEditing = true)}>Edit</button>
		{:else if data?.text}
			<span class="modal-header">{data.text}</span>
			<button on:click={() => (isEditing = true)}>Edit</button>
		{:else}
			<span>Not found</span>
		{/if}
	</div>
</Modal>

<style>
	.modal-header {
		margin-top: 0.5rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
</style>
