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

	/**
	 * @type {Modal}
	 */
	let modal;
	const md = new markdownit();

	/**
	 * @param {any} item
	 */
	function viewItem(item) {
		selectedItem = { ...item };
		isEditing = false;
		manual = selectedItem.item?.data == null;
		showItemModal = true;
	}
	let showItemModal = false;
	let isEditing = false;
	let isUpdating = false;

	let manual = true;

	async function updateItem() {
		if (!$selectedCharacter) return;
		isUpdating = true;

		if (selectedItem.id < 1) {
			data.push(selectedItem);
		}

		data = [...data];
		//
		//await updateListItem();
		let newData = JSON.parse(JSON.stringify(data));

		//**  @parameter  {{ item: { data: any; }; }} */
		newData = newData.map((item) => {
			if (item.item.data) {
				item.item = { ...item.item.data };
			}
			return item;
		});

		// const importData = {
		// 	id: $selectedCharacter.id,
		// 	[listName]: [...newData]
		// };

		if (saveChanges) await saveChanges(newData);

		isEditing = false;
		isUpdating = false;
		modal.close();
	}

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

	/** @type { (item: any) => Promise<void>} */
	export let saveChanges = async ({}) => {
		return;
	};
	export function addItem() {
		selectedItem = {
			id: null,
			text: '',
			item: {
				data: {
					attributes: {
						name: undefined,
						description: undefined
					}
				}
			}
		};
		isEditing = true;
		showItemModal = true;
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
		{#if selectedItem?.item.data?.attributes}
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
				<Toggle bind:checked={manual} label="Manual Entry" />
				{#if manual}
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
			{selectedItem.text}
		{:else}
			<span>Not found</span>
		{/if}
	</div>
	<svelte:fragment slot="footer">
		{#if isEditing}
			<button on:click={() => updateItem()}>Save</button>
		{:else}
			<button on:click={() => (isEditing = true)}>Edit</button>
		{/if}
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
	button {
		--aug-border-bg: var(--menu-item-aug-border-bg);
		width: 100%;
		font-size: 0.8rem;
	}
</style>
