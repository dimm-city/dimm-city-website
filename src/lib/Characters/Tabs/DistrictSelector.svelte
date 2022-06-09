<script lang="ts">
	import Image from '$lib/Components/Image.svelte';
	import { districts } from '$lib/ShellStore';
	import { getDistricts } from '../../queries/getDistricts';
	import { onMount } from 'svelte';

	$: selectedItem = $districts.find((l) => l.id == value || l.slug == value);

	export let value: any;

	onMount(async () => {
		if ($districts.length < 1) {
			$districts = await getDistricts();
		}
	});

	function resetPreview() {
		selectedItem = $districts.find((l) => l.id == value || l.slug == value);
	}
	function selectItem(item: any) {
		selectedItem = item;
		value = item.id || item.slug;
	}
	function previewItem(item: any) {
		selectedItem = item;
	}
</script>

<style>
	.container {
		min-height: 100%;
		display: grid;
		grid-template-columns: 0.7fr 1.6fr;
		grid-template-rows: 0.5fr 0.5fr;
		gap: 1rem 1rem;
		grid-auto-flow: row;
		grid-template-areas:
			'image-area attributes-area'
			'description-area description-area';
	}

	.image-area {
		justify-self: center;
		align-self: center;
		grid-area: image-area;
		width: 100%;
		height: 100%;
	}

	.description-area {
		grid-area: description-area;
	}

	.attributes-area {
		grid-area: attributes-area;
	}
</style>

<div class="container">
	<div class="image-area">
		<Image imageUrl={selectedItem?.thumbnailUrl ?? selectedItem?.imageUrl} title={selectedItem?.name} />
	</div>
	<div class="description-area">
		<p>{selectedItem?.description || ''}</p>
	</div>
	<div class="attributes-area">
		<ul>
			{#each $districts as item}
				<li
					data-augmented-ui
					class="small-menu-item"
					class:selected={value == item.id}
					on:focus={() => selectItem(item)}
					on:mouseover={() => previewItem(item)}
					on:mouseout={() => resetPreview()}
					on:blur={resetPreview}
					on:click={() => selectItem(item)}
				>
					{item.name} <small />
				</li>
			{/each}
		</ul>
	</div>
</div>
