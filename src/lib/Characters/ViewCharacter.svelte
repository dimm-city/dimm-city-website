<script context="module">
	export const prerender = false;
</script>

<script>
	import Character from '$lib/Characters/Tabs/Character.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import Shell from '$lib/Components/Shell.svelte';
	import { characters, pageImage, showMenu } from '$lib/Shared/ShellStore';
	import Tab from '$lib/Components/Tab.svelte';
	import CharacterStats from '$lib/Characters/Tabs/CharacterStats.svelte';
	import { loadCharacter } from '$lib/Characters/getCharacterBySlug';
	import { onMount } from 'svelte';
	import CharacterBiography from '$lib/Characters/Tabs/CharacterBiography.svelte';
	import TabPanel from '$lib/Components/TabPanel.svelte';
	import Toolbar from '$lib/Components/Toolbar.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import Button from '$lib/Components/Button.svelte';
	import { canEdit } from '$lib/Characters/updateCharacter';
	import TwitterButton from '$lib/Components/TwitterButton.svelte';

	$showMenu = false;
	export let tokenId; // = $page.params.tokenId;
	let character;
	let query = new Promise(() => {});
	let tabs;
	let isEditable = true;

	onMount(async () => {
		isEditable = await canEdit(tokenId);
		character = $characters.find((c) => c.tokenId === tokenId && c.loaded);
		if (character == null || character.id < 1) {
			query = loadCharacter(tokenId).then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
				$pageImage = character.thumbnailImage;
			});
		} else {
			query = new Promise((resolve) => resolve());
		}
	});
	async function selectCharcter(id) {
		tokenId = id;

		canEdit(tokenId).then((data) => {
			isEditable = data;
		});
		query = loadCharacter(tokenId).then((c) => {
			character = c;
			$characters = [c, ...$characters.filter((l) => l.id != c.id)];
		});
		$showMenu = false;
	}
</script>

<Shell title="Citizens">
	<div slot="content-toolbar">
		{#await query then}
			<Toolbar>
				<Button on:click={() => tabs.setTab('stats')} shape="square" title="Citizen Stats">
					<i class="btn bi bi-person-badge" />
				</Button>
				<Button on:click={() => tabs.setTab('story')} shape="square" title="Citizen Biography">
					<i class="fade-in btn bi bi-book" />
				</Button>
				<!-- <Button on:click={() => tabs.setTab('sheet')} shape="square">
					<i class="fade-in btn bi bi-gpu-card" />
				</Button> -->
				<TwitterButton
					text="Check out this Dimm City citizen file"
					hashTags="Sporos,DimmCity"
					shape="square"
					title="Share citizen file"
				>
					<i class="fade-in btn bi bi-share" />
				</TwitterButton>
				{#if isEditable}
					<Button url="/citizens/update/{character.tokenId}" shape="square" title="Edit citizen profile">
						<i class="fade-in btn bi bi-device-ssd" />
					</Button>
				{/if}
			</Toolbar>
		{/await}
	</div>
	{#await query}
		<LoadingIndicator>Extracting character data...</LoadingIndicator>
	{:then}
		<TabPanel bind:this={tabs} initialTab="story">
			<Tab id="stats" padding={2}>
				<CharacterStats {character} title={character.name} />
			</Tab>
			<Tab id="story" padding={2}>
				<CharacterBiography {character} />
			</Tab>
			<Tab id="sheet" padding={1}>
				<Character {character} />
			</Tab>
		</TabPanel>
	{/await}
	<CharacterMenu slot="menu" on:character.selected={(e) => selectCharcter(e.detail)} />
</Shell>
