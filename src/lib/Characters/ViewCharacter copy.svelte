<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import { pageImage } from '$lib/Shared/Stores/ShellStore';
	import Tab from '$lib/Shared/Components/Tab.svelte';
	import CharacterStats from '$lib/Characters/Components/Tabs/CharacterStats.svelte';
	import CharacterSheet from '$lib/Characters/Components/Tabs/CharacterSheet.svelte';
	import { loadCharacter } from '$lib/Characters/Queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import CharacterBiography from '$lib/Characters/Components/Tabs/CharacterBiography.svelte';
	import TabPanel from '$lib/Shared/Components/TabPanel.svelte';
	import Toolbar from '$lib/Shared/Components/Toolbar.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import Button from '$lib/Shared/Components/Button.svelte';
	import TwitterButton from '$lib/Shared/Components/TwitterButton.svelte';
	import { characters } from './CharacterStore';
	import { ownsToken } from '$lib/Shared/Stores/UserStore';
	import { type ICharacter, Character } from './Models/Character';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Sheet from './Components/CharacterSheet/Sheet.svelte';

	export let tokenId: string; // = $page.params.tokenId;
	let character: ICharacter;
	let query = new Promise(() => {});
	let tabs: TabPanel;
	let isEditable = false;

	$: isEditable = character && ownsToken(character?.token);

	onMount(async () => {
		//isEditable = await canEdit(tokenId);
		character = $characters.find((c) => c.tokenId === tokenId && c.loaded) ?? new Character();
		if (character == null || character.id < 1) {
			query = loadCharacter(tokenId).then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
				$pageImage = character.thumbnailImage;
			});
		} else {
			query = new Promise((resolve) => resolve(new Character()));
		}
	});
</script>

<Shell title="Citizens" titleUrl="/citizens" fullscreen={true}>
	<div slot="content-toolbar">
		{#await query then}
			<Toolbar>
				<Button on:click={() => tabs.setTab('stats')} shape="square" title="Citizen Stats">
					<i class="btn bi bi-person-badge" />
				</Button>
				<Button on:click={() => tabs.setTab('story')} shape="square" title="Citizen Biography">
					<i class="fade-in btn bi bi-book" />
				</Button>
				<Button on:click={() => tabs.setTab('sheet')} shape="square">
					<i class="fade-in btn bi bi-gpu-card" />
				</Button>
				<TwitterButton
					text="Check out this Dimm City citizen file"
					hashTags="Sporos,DimmCity"
					shape="square"
					title="Share citizen file"
				>
					<i class="fade-in btn bi bi-share" />
				</TwitterButton>
				{#if isEditable}
					<Button
						url="/console/characters/update/{character.tokenId}"
						shape="square"
						title="Edit citizen profile"
					>
						<i class="fade-in btn bi bi-device-ssd" />
					</Button>
				{/if}
			</Toolbar>
		{/await}
	</div>
	<ContentPane padding={1}>
		{#await query}
			<LoadingIndicator>Extracting character data...</LoadingIndicator>
		{:then}
			<TabPanel bind:this={tabs} initialTab="sheet">
				<Tab id="stats" padding={2}>
					<CharacterStats {character} title={character.name} />
				</Tab>
				<Tab id="story" padding={2}>
					<CharacterBiography {character} />
				</Tab>
				<Tab id="sheet" padding={1}>
					<!-- <CharacterSheet {character} />  -->
					<Sheet {character} />
				</Tab>
			</TabPanel>
		{/await}
	</ContentPane>
</Shell>
