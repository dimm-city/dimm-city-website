<script>
	import FlexMenu from '$lib/Components/Menu/FlexMenu.svelte';
	import { filterAndSort, specialties, searchText } from '$lib/Shared/ShellStore';
	import { onMount } from 'svelte';
	import { getSpecialties } from './getSpecialties';

	export let selectedItem = '';

	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			if ($specialties?.length < 1) {
				let data = await getSpecialties();
				if (data != null) {
					$specialties = data;
				}
				resolve(data);
			} else resolve($specialties);
		});
	});

	$: filteredSpecialties = $searchText
		? $specialties.filter((c) =>  c.name.toLowerCase().includes($searchText.toLowerCase()) 
			|| c.description.toLowerCase().includes($searchText.toLowerCase()))
		: $specialties;

	function selectItem(item) {
		selectedItem = item.slug;
		document.location = '/specialties/' + item.slug;
		return true;
	}
</script>

<FlexMenu data={filteredSpecialties} {query} on:itemSelected={selectItem} icon="bi-person-fill">
	<div slot="description" let:item>
		<small>{item.shortDescription}</small>
	</div>
</FlexMenu>

<!-- 
{#await query}
	<LoadingIndicator>
		<div>Loading location data...</div>
	</LoadingIndicator>
{:then}
	{#if $specialties != null}
		{#each $specialties as item}
			<MenuItem url="/specialties/{item.slug}" on:click={selectItem}>
				<p><i class="bi bi-person text-light" />{item.name}</p>
				<small>
					{#if item.description}
						<div />
					{:else}
						<div>Unknown specialty</div>
					{/if}
				</small>

				<div class="toolbar">
				</div>
			</MenuItem>
		{/each}
		<div class="item-container">&nbsp;</div>
	{/if}
{:catch e}
	<div>{e}</div>
{/await} -->
