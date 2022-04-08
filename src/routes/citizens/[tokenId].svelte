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
	import CharacterStats from '$lib/Characters/Editors/CharacterStats.svelte';
	import { loadCharacter } from '$lib/queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import CharacterBiography from '$lib/Characters/Editors/CharacterBiography.svelte';
	import TabPanel from '$lib/Components/TabPanel.svelte';
	import Toolbar from '$lib/Components/Toolbar.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import Button from '$lib/Components/Button.svelte';

	$showMenu = false;
	let tokenId = $page.params.tokenId;
	let character;
	let query = new Promise(() => {});
	let tabs;
	onMount(() => {
		character = $characters.find((c) => c.tokenId === tokenId && c.loaded);
		if (character == null || character.id < 1) {
			query = loadCharacter(tokenId).then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
			});
		} else {
			query = new Promise((resolve) => resolve());
		}
	});
	async function selectCharcter(id) {
		tokenId = id;
		query = loadCharacter(tokenId).then((c) => {
			character = c;
			$characters = [c, ...$characters.filter((l) => l.id != c.id)];
		});
		$showMenu = false;
	}
</script>

<Shell title="Citizen Dossier">
	<div slot="content-toolbar">
		{#await query then}
			<Toolbar>
				<Button on:click={() => tabs.setTab('stats')} shape="square">
					<i class="btn bi bi-person-badge" />
				</Button>
				<Button on:click={() => tabs.setTab('story')} shape="square">
					<i class="fade-in btn bi bi-book" />
				</Button>
				<Button on:click={() => tabs.setTab('sheet')} shape="square">
					<i class="fade-in btn bi bi-gpu-card" />
				</Button>
				<Button on:click={() => tabs.setTab('stats')} shape="square" title="Edit citizen profile">
					<i class="fade-in btn bi bi-device-ssd" />
				</Button>
			</Toolbar>
		{/await}
	</div>
	{#await query}
		<LoadingIndicator>Extracting character data...</LoadingIndicator>
	{:then}
		<TabPanel bind:this={tabs} initialTab="stats">
			<Tab id="stats" padding={2}>				
				<CharacterStats {character} title={character.name}/>
			</Tab>
			<Tab id="story" padding={2}>
				<CharacterBiography {character} />
			</Tab>
			<Tab id="sheet" padding={1}>
				<Character {character} />
			</Tab>
		</TabPanel>
	{/await}
	<Menu slot="menu">
		<CharacterMenu on:character.selected={(e) => selectCharcter(e.detail)} />
	</Menu>
</Shell>
