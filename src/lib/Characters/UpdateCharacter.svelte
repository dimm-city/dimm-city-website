<script lang="ts">
	import CharacterTab from '$lib/Characters/Components/Tabs/Character.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import { characters } from '$lib/Shared/Stores/ShellStore';
	import Tab from '$lib/Shared/Components/Tab.svelte';
	import CharacterStats from '$lib/Characters/Components/Tabs/CharacterStats.svelte';
	import { loadCharacter } from '$lib/Characters/Queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import CharacterBiography from '$lib/Characters/Components/Tabs/CharacterBiography.svelte';
	import TabPanel from '$lib/Shared/Components/TabPanel.svelte';
	import Toolbar from '$lib/Shared/Components/Toolbar.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import Button from '$lib/Shared/Components/Button.svelte';
	import { canEdit, updateCharacter } from '$lib/Characters/Queries/updateCharacter';
	import { Character, type ICharacter } from './Models/Character';

	export let tokenId;
	let isSaving = false;
	let character: ICharacter;
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
</Shell>
