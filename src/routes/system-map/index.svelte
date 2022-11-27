<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import { searchText } from '$lib/Shared/Stores/ShellStore';
	import List from './List.svelte';
	import { getDistricts } from '$lib/Dashboard/getDistricts';
	import { getSpecialties } from '$lib/Dashboard/getSpecialties';
	import { getJournalEntries } from '$lib/JournalEntries/getJournalEntries';

	let _systemMap = [];
	const getSystemMap = async () => {
		if (_systemMap?.length == 0) {
			_systemMap = [
				{
					name: 'Dashboard',
					slug: '',
					children: []
				},
				{
					name: 'Op Console',
					slug: 'console',
					children: []
				},
				{
					name: 'Citizen Files',
					slug: 'citizens',
					children: []
				},
				{
					name: 'Locations',
					slug: 'locations',
					children: await getDistricts()
				},
				{
					name: 'Specialties',
					slug: 'specialties',
					children: await getSpecialties()
				},
				{
					name: 'Journal Entries',
					slug: 'journal-entries',
					children: await getJournalEntries()
				},
				{
					name: 'Spores',
					slug: 'spores'
				},
				{
					name: 'About',
					slug: 'about',
					children: [
						{
							name: 'Change Log',
							slug: 'change-log'
						},
						{
							name: 'System Stats',
							slug: 'stats'
						},
						{
							name: 'Depenedcies and Integrations',
							slug: 'depenedcies'
						}
					]
				}
				// {
				// 	name: 'Historical Record',
				// 	slug: 'history',
				// 	children: [
				// 		{
				// 			name: 'Welcome to Dimm City',
				// 			slug: 'introduction'
				// 		},
				// 		{
				// 			name: 'Prologue - Scene 1',
				// 			slug: 'prologue-scene-1'
				// 		},
				// 		{
				// 			name: 'Prologue - Scene 2',
				// 			slug: 'prologue-scene-2'
				// 		}
				// 	]
				// }
			];
		}
		return _systemMap;
	};

	$: data = _systemMap;
	// $: if ($searchText > '') {
	// 	data = JSON.parse(JSON.stringify(_systemMap));
	// 	getItemsWithText(data);
	// } else {
	// 	data = _systemMap;
	// }

	// function getItemsWithText(items: Array<any>) {
	// 	let filteredItems = items
	// 			.filter((i) => childrenContainText(i))
	// 			.map((i) => {
	// 				i.children = i.children.filter((c) => childrenContainText(c));
	// 				return i;
	// 			})
	// 	;
	// 	console.log(filteredItems);

	// 	return filteredItems;
	// }

	// function childrenContainText(item: any) {
	// 	return (
	// 		item.name?.toLowerCase().includes($searchText.toLowerCase()) ||
	// 		item.children?.some((c) => c.name.toLowerCase().includes($searchText.toLowerCase()) || childrenContainText(c))
	// 	);
	// }
</script>

<style>
	:global(li > ul) {
		list-style-type: none;
		margin-top: 0.5rem;
	}
	:global(ul li) {
		position: relative;
		list-style-type: none;
		padding-left: 1rem;
		margin-bottom: 0.5rem;
	}
	:global(ul li:before) {
		content: '>';
		display: block;
		position: absolute;
		color: var(--third-accent);
		left: 0;
		top: -2px;
		width: 5px;
		height: 11px;
	}
	/* :global(li > ul.inner-list) {
		list-style-type: none;
        margin-top: 0.5rem;
	}
	:global(ul.inner-list li) {
		position: relative;
		list-style-type: none;
		padding-left: 1rem;
		margin-bottom: 0.5rem;
	}
	:global(ul.inner-list li:before) {
		content: '>';
		display: block;
		position: absolute;
		color: var(--third-accent);
		left: 0;
		top: -2px;
		width: 5px;
		height: 11px;
	} */
</style>

<Shell title="System Map" enableSearch={false}>
	<ContentPane padding={1}>
		{#await getSystemMap()}
			<LoadingIndicator>
				<div>Indexing system... please wait...</div>
			</LoadingIndicator>
		{:then}
			<List {data} />
		{/await}
	</ContentPane>
</Shell>
