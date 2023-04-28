<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import { pageImage } from '$lib/Shared/Stores/ShellStore';
	import { loadCharacter } from '$lib/Characters/Queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import TwitterButton from '$lib/Shared/Components/TwitterButton.svelte';
	import { characters, updateCharacter } from './CharacterStore';
	import { ownsToken } from '$lib/Shared/Stores/UserStore';
	import { type ICharacter, Character } from './Models/Character';
	import Sheet from './Components/CharacterSheet/Sheet.svelte';
	export let tokenId: string;
	let character: ICharacter;
	let originalCharacter: string;
	let query = new Promise(() => {});
	let isEditable = false;
	let isEditing = false;
	let isSaving = false;

	$: isEditable = character && ownsToken(character?.token);

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
		character = $characters.find((c) => c.tokenId === tokenId && c.loaded) ?? new Character(null);
		if (character == null || character.id < 1) {
			query = loadCharacter(tokenId).then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
				$pageImage = character.thumbnailImage;
			});
		} else {
			query = new Promise((resolve) => {
				resolve(new Character(null));
			});
		}
	});
</script>

<Shell title="Citizen File" titleUrl="/citizens" fullscreen={true}>
	{#await query}
		<LoadingIndicator>
			{#if isSaving}
				Saving changes...
			{:else}
				Extracting character data...
			{/if}
		</LoadingIndicator>
	{:then}
		<Sheet {character} {isEditing} />
	{/await}
	<svelte:fragment slot="action-menu">
		{#if isEditing}
			<button on:click={saveChanges} class="aug-button animate__fadeInDownBig" data-augmented-ui=""
				><i class="bi bi-check" /></button
			>
			<button
				on:click={cancelChanges}
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-x" /></button
			>
		{:else}
			{#if isEditable}
				<button
					on:click={startEditing}
					class="aug-button animate__fadeInDownBig"
					data-augmented-ui=""><i class="bi bi-pencil" /></button
				>
			{/if}
			<TwitterButton />
			<a
				href="/citizens/{character?.tokenId}/print"
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-printer" /></a
			>
		{/if}
	</svelte:fragment>
</Shell>
