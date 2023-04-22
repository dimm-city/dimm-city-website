<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import { pageImage } from '$lib/Shared/Stores/ShellStore';
	import { loadCharacter } from '$lib/Characters/Queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import TwitterButton from '$lib/Shared/Components/TwitterButton.svelte';
	import { characters } from './CharacterStore';
	import { ownsToken } from '$lib/Shared/Stores/UserStore';
	import { type ICharacter, Character } from './Models/Character';
	import Sheet from './Components/CharacterSheet/Sheet.svelte';

	export let tokenId: string; // = $page.params.tokenId;
	let character: ICharacter;
	let query = new Promise(() => {});
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

<Shell title="Citizen File" titleUrl="/citizens" fullscreen={true}>
	{#await query}
		<LoadingIndicator>Extracting character data...</LoadingIndicator>
	{:then}
		<Sheet {character} />
	{/await}
	<svelte:fragment slot="action-menu">
		<a href="/console/characters/update/{character?.tokenId}" class="aug-button animate__fadeInDownBig" data-augmented-ui=""><i class="bi bi-pencil" /></a>
		<TwitterButton ></TwitterButton>
		<a href="/citizens/{character?.tokenId}/print" class="aug-button fade-in animate__fadeInDownBig" data-augmented-ui=""><i class="bi bi-printer" /></a>
	</svelte:fragment>
</Shell>
