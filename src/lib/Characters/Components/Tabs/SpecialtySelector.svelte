<script lang="ts">
	import Image from '$lib/Shared/Components/Image.svelte';
	import { getSpecialties } from '$lib/Specialties/getSpecialties';
	import { onMount } from 'svelte';

	export let character;
	$: items = [];
	$: selectedItem = items.find((l) => character.specialties.some((r) => r && r.slug == l.slug));

	onMount(async () => {
		if (items.length < 1) {
			items = await getSpecialties();
		}
	});

	function resetPreview() {
		selectedItem = items.find((i) => isSelected(i));
	}
	const isSelected = (item: any) => character.specialties.some((r) => r.slug == item.slug);

	function toggleItem(item: any) {
		console.log(item, isSelected(item), character.specialties);

		if (isSelected(item)) {
			character.specialties = character.specialties.filter((r) => r.slug != item.slug);
		} else {
			character.specialties = [item, ...character.specialties];
		}
		console.log(character.specialties);
	}
	function previewItem(item: any) {
		selectedItem = item;
	}
</script>

<style>
	.container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 0.4fr 0.56fr;
		/* grid-template-rows: 0.5fr 0.5fr; */
		gap: 1rem 1rem;
		grid-auto-flow: row;
		grid-template-areas: 'image-area attributes-area';
	}

	.image-area {
		justify-self: center;
		align-self: center;
		grid-area: image-area;
		width: 100%;
		height: 100%;
	}

	/* .description-area {
		grid-area: description-area;
	} */

	.attributes-area {
		grid-area: attributes-area;
		/* max-height: 400px;
		overflow-y: auto; */
	}

	.specialties-grid {
		display: grid;
		grid-template-columns: 0.5fr 0.5fr;
		gap: 0.5rem 1.5rem;
	}
</style>

<div class="container">
	<div class="image-area">
		<Image imageUrl={selectedItem?.thumbnailUrl ?? selectedItem?.imageUrl} title={selectedItem?.name} />
		<p>{selectedItem?.description || ''}</p>
	</div>
	<!-- <div class="description-area">
		<p>{selectedItem?.description || ''}</p>
	</div> -->
	<div class="attributes-area">
		<div class="specialties-grid">
			{#each items as item}
				<div
					data-augmented-ui
					class="small-menu-item"
					class:selected={character.specialties.some((r) => r.slug == item.slug)}
					on:focus={() => toggleItem(item)}
					on:mouseover={() => previewItem(item)}
					on:mouseout={() => resetPreview()}
					on:blur={resetPreview}
					on:click={() => toggleItem(item)}
				>
					{item.name} <small />
				</div>
			{/each}
		</div>
	</div>
</div>
