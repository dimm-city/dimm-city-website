<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import Character from '$lib/Characters/Character.svelte';
	import CharacterMenu from '$lib/Characters/CharacterMenu.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import Shell from '$lib/Shell.svelte';
	import { characters, showMenu } from '$lib/ShellStore';
	import Tab from '$lib/Components/Tab.svelte';
	import Button from '$lib/Components/Button.svelte';
	import CharacterStats from '$lib/Characters/Editors/CharacterStats.svelte';
	import { loadCharacter } from '$lib/queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import CharacterBiography from '$lib/Characters/Editors/CharacterBiography.svelte';
	import TabPanel from '$lib/Components/TabPanel.svelte';
	import Toolbar from '$lib/Components/Toolbar.svelte';

	$showMenu = false;
	let tokenId = $page.params.tokenId;

	let character;

	// $: {
	// 	if (!tokenId || tokenId.length < 1) {
	// 		character = {};
	// 	} else {
	// 		//let character = $characters.find((c) => c.tokenId === tokenId && c.loaded);
	// 		//if (character) return character;
	// 		console.log('initial character', tokenId);

	// 		query = loadCharacter(tokenId);
	// 		$showMenu = false;
	// 	}
	// }

	let query = new Promise(() => {});
	let tabs;
	onMount(() => {
		console.log('mount character', tokenId);

		character = $characters.find((c) => c.tokenId === tokenId && c.loaded);
		if (character == null || character.id < 1) {
			// 		//if (character) return character;
			query = loadCharacter(tokenId).then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
			});
		} else {
			query = new Promise((resolve) => resolve());
		}
	});
	function selectCharcter(id) {
		tokenId = id;
		query = loadCharacter(tokenId).then((c) => {
			character = c;
			$characters = [c, ...$characters.filter((l) => l.id != c.id)];
		});
		$showMenu = true;
	}
</script>

<Shell title="Citizen Dossier">
	<div slot="content-toolbar">
		<Toolbar>
			<i class="btn bi bi-file-person fade-in" on:click={() => tabs.setTab('stats')} />
			<i class="bi bi-journal fade-in" on:click={() => tabs.setTab('story')} />
			<i class="bi bi-gpu-card fade-in" on:click={() => tabs.setTab('sheet')} />
			<i class="bi bi-pencil fade-in" on:click={() => tabs.setTab('sheet')} />
			<!-- <Button on:click={() => setTab('stats')}>Story</Button>
			<Button on:click={() => setTab('sheet')}>Sheet</Button>
		<Button on:click={() => setTab('story')}>Story</Button> -->
		</Toolbar>
	</div>
	{#await query}
		<div class="loading-indicator fade-in" data-augmented-ui>
			<div>Loading data...</div>
		</div>
	{:then}
		<TabPanel bind:this={tabs} initialTab="stats">
			<!-- <div slot="toolbar" let:setTab>
				<i class="bi bi-file-person fade-in" on:click={() => setTab('stats')} />
				<i class="bi bi-journal fade-in" on:click={() => setTab('story')} />
				<i class="bi bi-gpu-card fade-in" on:click={() => setTab('sheet')} />
				<i class="bi bi-pencil fade-in" on:click={() => setTab('sheet')} />				
			</div> -->
			<Tab id="stats">
				<h2>{character.name}</h2>
				<CharacterStats {character} />
			</Tab>
			<Tab id="story">
				<h2>Biography</h2>
				<CharacterBiography {character} />
			</Tab>
			<Tab id="sheet">
				<Character {character} />
			</Tab>
		</TabPanel>
	{/await}
	<Menu slot="menu">
		<CharacterMenu />
	</Menu>
</Shell>
