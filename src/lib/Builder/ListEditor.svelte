<script>
	import List from '$lib/Shared/Components/List.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import Select from 'svelte-select';
	import Modal from './Modal.svelte';
	import markdownit from 'markdown-it';
	import Toggle from '$lib/Shared/Components/Toggle.svelte';
	import Input from '$lib/Shared/Components/Input.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	import { selectedCharacter } from './BuilderStore';

	const md = new markdownit();
	/**
	 * @type {Modal}
	 */
	let modal;
	let showItemModal = false;
	let isEditing = false;
	let isUpdating = false;
	let manualEditing = true;

	/**
	 * @type {any}
	 */
	let selectedItem;

	/**
	 * @type {DC.ListItem<any>[]}
	 */
	export let data;

	export let noItemsText = 'no items';

	/**
	 * @type { () => Promise<never[] | any[] | null>}
	 */
	export let getItems = async () => [];

	/**
	 * @param {any} item
	 */
	function viewItem(item) {
		selectedItem = { ...item };
		isEditing = false;
		manualEditing = selectedItem.item?.data == null;
		showItemModal = true;
	}

	function updateItem() {
		if (!$selectedCharacter || !selectedItem) return;

		isUpdating = true;

		console.log('updateItem', selectedItem, data);
		if (selectedItem.id == null) {
			data.push(selectedItem);
		} else if (selectedItem.id > 0) {
			data = data.map((item) => {
				if (item.id == selectedItem.id) {
					item = { ...selectedItem };
				}
				return item;
			});
		}

		data = [...data];

		console.log('data', data);
		isEditing = false;
		isUpdating = false;
		modal.close();
	}

	export function addItem() {
		selectedItem = {
			text: '',
			item: {
				data: null
			}
		};

		manualEditing = false;
		isEditing = true;
		showItemModal = true;
	}

	/**
	 * @param {DC.ListItem<any>} item
	 */
	export function deleteItem(item) {
		if (item.id == null) {
			const filteredItems = data.filter(
				(i) =>  JSON.stringify(item) !== JSON.stringify(i)
			);
			data = [...filteredItems];
		} else {
			data = [...data.filter((i) => item.id != null && i.id !== item.id)];
		}
		modal.close();
	}
</script>

<!-- <button on:click={() => addItem()} class="aug-button">Add Item</button> -->
<List bind:data maxItems={-1} {noItemsText}>
	<div let:item slot="item">
		{#if item.item?.data?.attributes}
			<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}>
				{item.item?.data.attributes.name ?? 'Unknown'}
			</button>
		{:else}
			<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}>
				{item.text}
			</button>
		{/if}
	</div>
</List>
<Modal bind:this={modal} bind:show={showItemModal}>
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
		{#if isUpdating}
			<LoadingIndicator>Updating inventory...</LoadingIndicator>
		{:else if isEditing}
			<div class="modal-body">
				<Toggle bind:checked={manualEditing} label="Manual Entry" />
				{#if manualEditing}
					<Input bind:value={selectedItem.text} />
					<Textarea bind:value={selectedItem.description} />
				{:else}
					<div class="value aug-select">
						<Select
							loadOptions={getItems}
							placeholder="Select an item"
							label="name"
							itemId="id"
							multiple={false}
							bind:value={selectedItem.item.data}
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
		{:else if selectedItem?.item.data?.attributes}
			{@html md.render(selectedItem.item.data.attributes?.description ?? '')}
		{:else if selectedItem?.text}
			{@html md.render(selectedItem.description ?? '')}
		{:else}
			<span>Not found</span>
		{/if}
	</div>
	<svelte:fragment slot="footer">
		<div class="toolbar">

		{#if isEditing}
			<button on:click={() => updateItem()}>Save</button>
		{:else}
			<button on:click={() => deleteItem(selectedItem)}>Delete</button>
			<button on:click={() => (isEditing = true)}>Edit</button>
		{/if}
		</div>
	</svelte:fragment>
</Modal>

<style>
	:global(.list) {
		--list-gap: 0.5rem;
		padding-inline: 0.5rem;
	}
	.modal-content {
		aspect-ratio: 1;
		min-height: 30ch;
		padding: 0.5rem;
	}

	.modal-body {
		display: grid;
		gap: 1rem;
	}
	.toolbar{
		display: flex;
		justify-items: stretch;
		gap: 0.5rem;
	}
	button {
		--aug-border-bg: var(--menu-item-aug-border-bg);
		width: 100%;
		font-size: 0.8rem;
	}
</style>
