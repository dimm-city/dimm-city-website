<script>
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import { searchText } from '$lib/Shared/Stores/ShellStore';
	import { onMount } from 'svelte';
	import { getSpecialties } from './getSpecialties';
	import { specialties } from './SpecialtyStore';

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
		console.log('select speciality', item);
		selectedItem = item.detail.slug;
		document.location = '/specialties/' + item.detail.slug;
		return false;
	}
</script>

<FlexMenu data={filteredSpecialties} {query} on:itemSelected={selectItem} icon="bi-person-fill">
	<div slot="description" let:item>
		<small>{item.shortDescription}</small>
	</div>
</FlexMenu>