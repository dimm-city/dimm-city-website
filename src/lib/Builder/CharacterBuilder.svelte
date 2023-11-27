<script>
	import CharacterSelector from './CharacterSelector.svelte';
	import DetailsPanel from '$lib/Builder/DetailsPanel.svelte';
	import SkillTree from '$lib/Builder/SkillTree.svelte';
	import Sheet from '$lib/Characters/Components/CharacterSheet/Sheet.svelte';
	import HexMenu from '$lib/Shared/Components/Menu/HexMenu.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { jwt } from '$lib/Shared/Stores/UserStore';
	import { StrapiClient } from '$lib/Shared/StrapiClient';
	import { updateEntity } from '$lib/Shared/SvelteStrapi';
	import { config } from '$lib/Shared/config';
	import { writable } from 'svelte/store';
	import EditCharacter from './CharacterEditor.svelte';
	import MainMenu from '$lib/Shared/Shell/MainMenu.svelte';
	import { formatCharacterSpecialties } from '$lib/Shared/FormatFunctions';

	let showMainPanel = false;
	/**
	 * @type {any}
	 */
	export let data;

	let characterSlug = data.citizen ?? 'dcs1r1-29';
	let skillTreeSlug = data.skillTree;

	/** @type {DC.Character} */
	let character = data.citizenData;

	let skillTree = data.skillTreeData;

	let mode = data.mode ?? 'select';

	let originalCharacter = '';

	const client = new StrapiClient(config.apiBaseUrl, $jwt);

	function startEditing() {
		originalCharacter = JSON.stringify(character);
		changeMode('citizen');
	}

	async function saveChanges() {
		//if (ownsToken(data.attributes.tokenId)) {

		const importData = JSON.parse(JSON.stringify(character.attributes));
		importData.playerUpdated = true;
		//importData.slug = character.name.replace(' ', '-');

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
			changeMode('select');
		}
	}
	async function loadSkillTree(tree) {
		if (tree) skillTreeSlug = tree.attributes.slug;

		skillTree = await client.loadBySlug('dimm-city/skill-trees', skillTreeSlug);
		changeMode('skill-tree');
	}

	/**
	 * @param {string} newMode
	 */
	function changeMode(newMode) {
		mode = newMode;
		showMainPanel = false;
	}

	function printCharacter() {
		//TODO
		console.log('print character');
		
	}
</script>

<Shell title={character?.attributes.name ?? 'Sporo Builder'} titleUrl="/console/builder">
	{#if mode === 'skill-tree'}
		<SkillTree data={skillTree} />
	{:else if mode === 'citizen'}
		<div class="citizen">
			<EditCharacter bind:character />
		</div>
	{:else if mode === 'overview'}
		<div class="overview">
			<Sheet bind:character isEditing={false} on:save />
		</div>
	{:else}
		<CharacterSelector
			bind:selectedCharacter={character}
			on:edit={startEditing}
			on:view={() => changeMode('overview')}
		/>
	{/if}
	{#if mode !== 'select'}
		<DetailsPanel side="left" bind:showDetails={showMainPanel}>
			<div class="main-panel">
				{#if character?.id > 0}
					<h1><i class="bi bi-icon-name" />{character.attributes.name}</h1>
					<div>
						<h3>
							<i class="bi bi-icon-type" />Specialty: {formatCharacterSpecialties(character)}
						</h3>
						<h4>Available Skill Trees</h4>
						{#if character.attributes.specialties.data?.length > 0}
							{#each character.attributes.specialties.data as specialty}
								{#if specialty.attributes.skillTrees?.data.length > 0}
									{#each specialty.attributes.skillTrees?.data as tree}
										<a
											href="#skill-tree={tree?.attributes.slug}"
											on:click|preventDefault={() => loadSkillTree(tree)}
										>
											<div data-augmented-ui class="small-menu-item">
												<h5><i class="bi bi-icon-type" />{tree.attributes.name}</h5>
											</div>
										</a>
									{/each}
								{/if}
							{/each}
						{/if}
					</div>
				{:else}
					<div>Please select a character</div>
				{/if}
			</div>
		</DetailsPanel>
	{/if}
	<svelte:fragment slot="left-button">
		{#if mode !== 'select'}
			<button
				class="dropdown-button aug-button"
				data-augmented-ui="all-hex both"
				title="select character"
				on:click={() => changeMode('select')}
			>
				<i class="bi bi-arrow-left" />
			</button>
		{:else if mode == 'citizen'}
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
		{#if mode == 'citizen'}
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
		{:else}
			<!-- <HexMenu title="action menu">
				<button on:click={() => changeMode('overview')}>Overview</button>
				<button on:click={() => startEditing()}>Edit Character</button>
				<button on:click={() => changeMode('select')}>Select Character</button>
			</HexMenu> -->
		{/if}
	</svelte:fragment>
</Shell>

<style>
	h1 {
		text-align: center;
		margin: 0;
		margin-bottom: 2rem;
	}

	.overview,
	.citizen {
		overflow-y: auto;
		padding-left: 3rem;

		color: var(--light);
	}
	.main-panel {
		padding-top: 1rem;
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

	@media (max-width: 800px) {
		.overview,
		.citizen {
			padding-left: 0rem;
		}
	}
</style>
