<script lang="ts">
	//import { page } from '$app/stores';
	import CharacterTab from '$lib/Characters/Tabs/Character.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import Shell from '$lib/Shell.svelte';
	import { characters, showMenu, myCollection } from '$lib/ShellStore';
	import Tab from '$lib/Components/Tab.svelte';
	import CharacterStats from '$lib/Characters/Tabs/CharacterStats.svelte';
	import { loadCharacter } from '$lib/queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import CharacterBiography from '$lib/Characters/Tabs/CharacterBiography.svelte';
	import TabPanel from '$lib/Components/TabPanel.svelte';
	import Toolbar from '$lib/Components/Toolbar.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import Button from '$lib/Components/Button.svelte';
	import { canEdit, updateCharacter } from '$lib/queries/updateCharacter';
	import { Character } from './Character';

	$showMenu = false;
	export let tokenId;
	let isSaving = false;
	let character: Character;
	let query = new Promise(() => {});
	let tabs;
	onMount(async () => {
		const isEditable: boolean = await canEdit(tokenId);
		if (!isEditable) window.history.back();

		character = $characters.find((c) => c.tokenId === tokenId && c.loaded);
		if (character == null || character.id < 1) {
			query = loadCharacter(tokenId).then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
			});
		} else {
			query = new Promise((resolve) => resolve(new Character()));
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

	async function save() {
		isSaving = true;
		query = updateCharacter(character)
			.then(() => {
				isSaving = false;
				//$characters = [...$characters.filter((l) => l.id != character.id)];
				//window.location.href = '/citizens/' + tokenId;
				// if (window.history.length > 0) window.history.back();
				// else window.location.href = '/citizens';
			})
			.catch((reason) => {
				console.error('Error updating citizen file', reason);
			});
	}

	async function cancel() {
		query = loadCharacter(tokenId)
			.then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
			})
			.then(() => {
				// if (window.history.length > 0) window.history.back();
				// else
				window.location.href = '/citizens';
			});
	}
</script>

<Shell title="Update Citizen File" fullscreen={true}>
	<div slot="content-toolbar">
		{#await query then}
			<Toolbar>
				<Button on:click={() => cancel()} shape="square" title="cancel">
					<i class="fade-in btn bi bi-file-x" />
				</Button>
				<Button on:click={() => tabs.setTab('stats')} shape="square" title="stats">
					<i class="btn bi bi-person-badge" />
				</Button>
				<Button on:click={() => tabs.setTab('story')} shape="square" title="notes">
					<i class="fade-in btn bi bi-book" />
				</Button>
				<Button on:click={() => save()} shape="square" title="save changes">
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
				<CharacterStats {character} title={character.name} readonly={false} />
			</Tab>
			<Tab id="story" padding={2}>
				<CharacterBiography {character} readonly={false} />
			</Tab>
			<Tab id="sheet" padding={1}>
				<CharacterTab {character} />
			</Tab>
		</TabPanel>
	{/await}
	<Menu slot="menu">
		<CharacterMenu on:character.selected={(e) => selectCharcter(e.detail)} />
	</Menu>
</Shell>
