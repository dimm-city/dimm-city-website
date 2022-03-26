<script lang="ts">
	import Image from '$lib/Components/Image.svelte';
	import { loadRoles } from '../../queries/getRoles';
	import { onMount } from 'svelte';
	import { roles } from '$lib/ShellStore';

	export let character;
	$: items = $roles;
	$: selectedItem = items.find((l) => character.roles.some((r) => r.slug == l.slug));

	onMount(async () => {
		if (items.length < 1) {
			$roles = await loadRoles();
		}
	});

	function resetPreview() {
		selectedItem = items.find((i) => isSelected(i));
	}
	const isSelected = (item: any) => character.roles.some((r) => r.slug == item.slug);

	function toggleItem(item: any) {
		console.log(item, isSelected(item), character.roles);

		if (isSelected(item)) {
			character.roles = character.roles.filter((r) => r.slug != item.slug);
		} else {
			character.roles = [item, ...character.roles];
		}
		console.log(character.roles);
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
			{#each items as item}
				<li
					data-augmented-ui
					class="small-menu-item"
					class:selected={character.roles.some((r) => r.slug == item.slug)}
					on:focus={() => toggleItem(item)}
					on:mouseover={() => previewItem(item)}
					on:mouseout={() => resetPreview()}
					on:blur={resetPreview}
					on:click={() => toggleItem(item)}
				>
					{item.name} <small />
				</li>
			{/each}
		</ul>
	</div>
</div>
