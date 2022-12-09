<script>
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import { searchText } from '$lib/Shared/Stores/ShellStore';
	import { onMount } from 'svelte';
	import { getDistricts } from './getDistricts';
	import { districts } from './LocationStore';

	export let selectedItem = '';

	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			if ($districts?.length < 1) {
				let data = await getDistricts();
				if (data != null) {
					$districts = data;
				}
				resolve(data);
			} else resolve($districts);
		});
	});

	$: filteredSpecialties = $searchText
		? $districts.filter((c) =>  c.name.toLowerCase().includes($searchText.toLowerCase()) 
			|| c.description.toLowerCase().includes($searchText.toLowerCase()))
		: $districts;

	function selectItem(item) {
		selectedItem = item.detail.slug;
		document.location = '/locations/' + item.detail.slug;
		return false;
	}
</script>

<FlexMenu data={filteredSpecialties} {query} on:itemSelected={selectItem} icon="bi-map-fill">
	<div slot="description" let:item>
		<small>{item.shortDescription}</small>
	</div>
</FlexMenu>