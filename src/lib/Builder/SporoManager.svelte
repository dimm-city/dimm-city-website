<script>
	import CharacterSelector from './CharacterSelector.svelte';
	import Sheet from '$lib/Characters/Components/CharacterSheet/Sheet.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { jwt } from '$lib/Shared/Stores/UserStore';
	import { StrapiClient } from '$lib/Shared/StrapiClient';
	import { updateEntity } from '$lib/Shared/SvelteStrapi';
	import { config } from '$lib/Shared/config';
	import CharacterEditor from './CharacterEditor.svelte';
	import MainMenu from '$lib/Shared/Shell/MainMenu.svelte';

	let showMainPanel = false;
	/**
	 * @type {any}
	 */
	export let data;

	let skillTreeSlug = data.skillTree;

	/** @type {DC.Character} */
	let character = data.citizenData;

	let skillTree = data.skillTreeData;

	let mode = data.mode ?? 'select-character';

	let originalCharacter = '';

	const client = new StrapiClient(config.apiBaseUrl, $jwt);

	function startEditing() {
		originalCharacter = JSON.stringify(character);
		changeMode('edit-character');
	}

	async function saveChanges() {
		//if (ownsToken(data.attributes.tokenId)) {

		const importData = JSON.parse(JSON.stringify(character.attributes));
		importData.playerUpdated = true;

		delete importData.mainImage;
		delete importData.mainModel;
		delete importData.mainVideo;
		delete importData.mainAudio;

		importData.currentLocation = character.attributes.currentLocation;
		importData.originLocation = character.attributes.originLocation;

		if (character.attributes.specialties.data?.length > 0)
			importData.specialties = [
				...character.attributes.specialties.data.map((r) => ({ id: Number.parseInt(r.id) }))
			];
		else importData.specialties = [];

		await updateEntity('dimm-city/characters', {
			id: character.id,
			...importData
		})
			.then(() => {
				console.log('character saved', character);
			})
			.catch((reason) => {
				console.error('Error updating citizen file', reason);
			});

		//}
	}

	function cancelChanges(goBack = false) {
		character = JSON.parse(originalCharacter);
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
		window.open(`/console/citizens/${character.attributes.tokenId}/print`, '_blank');
	}
</script>

<Shell title={character?.attributes.name ?? 'Sporo Manager'} titleUrl="/console/builder">
	{#if mode === 'edit-character'}
		<CharacterEditor bind:character />
	{:else if mode === 'view-character'}
		<Sheet bind:character isEditing={false} on:save />
	{:else}
		<CharacterSelector
			bind:selectedCharacter={character}
			on:edit={startEditing}
			on:print={printCharacter}
			on:view={() => changeMode('view-character')}
		/>
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
			<button
				class="aug-button"
				data-augmented-ui="all-hex both"
				title="undo changes"
				on:click={() => cancelChanges(false)}
			>
				<i class="bi bi-arrow-counterclockwise" /></button
			>
			<button
				class="aug-button"
				data-augmented-ui="all-hex both"
				title="save changes"
				on:click={saveChanges}
			>
				<i class="bi bi-check" /></button
			>
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
	h1 {
		text-align: center;
		margin: 0;
		margin-bottom: 2rem;
	}

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
