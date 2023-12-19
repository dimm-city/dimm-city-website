<script>
	import CharacterSelector from './CharacterSelector.svelte';
	import Sheet from '$lib/Characters/Components/CharacterSheet/Sheet.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import CharacterEditor from './CharacterEditor.svelte';
	import MainMenu from '$lib/Shared/Shell/MainMenu.svelte';
	import {
		toastFunction,
		loadAvailableCharacters,
		loadCharacter,
		selectedCharacter,
		updateCharacter
	} from './BuilderStore';
	import { onMount } from 'svelte';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
	toastFunction.set(addNotification);

	/**
	 * @type {any}
	 */
	export let data;
	let showMainPanel = false;

	onMount(async () => {
		//TODO: support deep linking to character editor tabs and preloading data
		// let skillTreeSlug = data.skillTree;
		// let skillTree = data.skillTreeData;
		// if (data.citizenData) $selectedCharacter = data.citizenData;

		loadAvailableCharacters();
	});

	let mode = data.mode ?? 'select-character';

	let originalCharacter = '';

	let isSaving = false;

	async function viewCharacter() {
		await loadCharacter($selectedCharacter?.attributes.tokenId);
		changeMode('view-character');
	}
	async function startEditing() {
		await loadCharacter($selectedCharacter?.attributes.tokenId);
		originalCharacter = JSON.stringify($selectedCharacter);
		changeMode('edit-character');
	}

	async function saveChanges() {
		isSaving = true;
		await updateCharacter();
		console.log('save changes');
		originalCharacter = JSON.stringify($selectedCharacter);
		//TODO: show toast alert notification
		isSaving = false;
	}

	function cancelChanges(goBack = false) {
		$selectedCharacter = JSON.parse(originalCharacter);
		if (goBack) {
			changeMode('select-character');
		}
	}

	/**
	 * @param {string} newMode
	 */
	function changeMode(newMode) {
		mode = newMode;
		showMainPanel = false;
	}

	function printCharacter() {
		//open url in new window
		window.open(`/console/citizens/${$selectedCharacter?.attributes?.tokenId}/print`, '_blank');
	}
</script>

<Shell title={$selectedCharacter?.attributes.name ?? 'Sporo Manager'} titleUrl="/console/builder">
	{#if mode === 'edit-character'}
		<CharacterEditor />
	{:else if mode === 'view-character' && $selectedCharacter}
		<Sheet bind:character={$selectedCharacter} isEditing={false} on:save />
	{:else}
		<CharacterSelector on:edit={startEditing} on:print={printCharacter} on:view={viewCharacter} />
	{/if}
	<svelte:fragment slot="left-button">
		{#if mode !== 'select-character'}
			<button
				class="dropdown-button aug-button"
				data-augmented-ui="all-hex both"
				title="select character"
				on:click={() => changeMode('select-character')}
			>
				<i class="bi bi-arrow-left" />
			</button>
		{:else if mode == 'edit-character'}
			<button
				class="dropdown-button aug-button"
				data-augmented-ui="all-hex both"
				title="cancel changes"
				on:click={() => cancelChanges(true)}
			>
				<i class="bi bi-arrow-left" /></button
			>
		{:else}
			<MainMenu />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="right-button">
		{#if mode == 'edit-character'}
			{#if isSaving}
				<button class="aug-button fade-in" disabled data-augmented-ui="all-hex both" title="saving changes">
					<i class="bi bi-cpu spin" /></button
				>
			{:else}
				<button
					class="aug-button fade-in"
					data-augmented-ui="all-hex both"
					title="undo changes"
					on:click={() => cancelChanges(false)}
				>
					<i class="bi bi-arrow-counterclockwise" /></button
				>
				<button
					class="aug-button fade-in"
					data-augmented-ui="all-hex both"
					title="save changes"
					class:busy={isSaving}
					on:click={saveChanges}
				>
					<i class="bi bi-check" /></button
				>
			{/if}
		{:else if mode == 'view-character'}
			<button
				class="aug-button"
				data-augmented-ui="all-hex both"
				title="print character"
				on:click={() => printCharacter()}
			>
				<i class="bi bi-printer" /></button
			>
		{:else}
			<!---->
		{/if}
	</svelte:fragment>
</Shell>

<style>
	.aug-button {
		aspect-ratio: 1/1;
		/* background: var(--pink); */
		--aug-border-all: 1px;
		--aug-border-bg: var(--yellow);
		--aug-all-width: max(45px, 2vw);
		--aug-inlay-bg: var(--pink);
		transition: transform var(--easing);

		opacity: 1;
	}

	.aug-button:hover,
	.aug-button:focus {
		color: white;

		--aug-border-bg: var(--pink);
	}
	.aug-button:hover i,
	.aug-button:focus i {
		font-size: 1.25rem;
	}

	.aug-button:not(:last-of-type) {
		margin-right: 1rem;
	}
</style>
