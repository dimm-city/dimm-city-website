<script lang="ts">
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { pageImage,pageDescription, pageTitle } from '$lib/Shared/Stores/ShellStore';
	import { loadCharacter } from '$lib/Characters/Queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import TwitterButton from '$lib/Shared/Components/TwitterButton.svelte';
	import { characters, updateCharacter } from './CharacterStore';
	import { ownsToken } from '$lib/Shared/Stores/UserStore';
	import { type ICharacter, Character } from './Models/Character';
	import Sheet from './Components/CharacterSheet/Sheet.svelte';
	export let tokenId: string;
	export let character: ICharacter;
	let originalCharacter: string;
	let query = new Promise(() => {});
	let isEditable = false;
	let isEditing = false;
	let isSaving = false;

	$: isEditable = character && ownsToken(character?.token);
	$pageImage = character?.thumbnailImage;
	$pageDescription = character?.vibe;
	$pageTitle = character.name;
	
	function startEditing() {
		isEditing = true;
		originalCharacter = JSON.stringify(character);
	}

	function saveChanges() {
		if (ownsToken(character.token)) {
			isSaving = true;
			query = new Promise(async (resolve) => {
				isSaving = true;
				await updateCharacter(character)
					.then(() => {
						console.log('character saved', character);
					})
					.catch((reason) => {
						console.error('Error updating citizen file', reason);
					})
					.finally(() => {
						resolve(null);
						isSaving = false;
						isEditing = false;
					});
			});
		}
	}

	async function save() {}

	function cancelChanges() {
		character = JSON.parse(originalCharacter);
		isEditing = false;
	}

	onMount(async () => {

		if (character?.id == null && tokenId) {
			character = $characters.find((c) => c.tokenId === tokenId && c.loaded) ?? new Character(null);
			if (character == null || character.id < 1) {
				query = loadCharacter(tokenId).then((c) => {
					character = c;
					$characters = [c, ...$characters.filter((l) => l.id != c.id)];
					$pageTitle = character.name;
					$pageImage = character.thumbnailImage;
					$pageDescription = character?.vibe;	
				});
			} else {
				query = new Promise((resolve) => {
					resolve(new Character(null));
				});
			}
		}
	});
</script>

<Shell title="{character?.name}" titleUrl="/citizens" fullscreen={true}>
	{#if character?.id}
		<Sheet {character} {isEditing} />
	{:else}
		{#await query}
			<LoadingIndicator>
				{#if isSaving}
					Saving changes...
				{:else}
					Extracting character data...
				{/if}
			</LoadingIndicator>
		{/await}
	{/if}
	<svelte:fragment slot="action-menu">
		{#if isEditing}
			<button
				title="save changes"
				on:click={saveChanges}
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-check" /></button
			>
			<button
				title="cancel changes"
				on:click={cancelChanges}
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-x" /></button
			>
		{:else}
			{#if isEditable}
				<button
					on:click={startEditing}
					title="edit character"
					class="aug-button animate__fadeInDownBig"
					data-augmented-ui=""><i class="bi bi-pencil" /></button
				>
			{/if}
			<TwitterButton title="share character" />
			<!-- <a
				title="print character"
				href="/citizens/{character?.tokenId}/print"
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-printer" /></a
			> -->
		{/if}
	</svelte:fragment>
</Shell>
