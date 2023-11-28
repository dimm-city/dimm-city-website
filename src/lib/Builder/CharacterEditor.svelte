<script>
	import ListsRow from '../Characters/Components/CharacterSheet/ListsRow.svelte';
	import ProfileEditor from './ProfileEditor.svelte';
	import CharacterStory from './CharacterStory.svelte';
	import SkillTreeSelector from './SkillTreeSelector.svelte';
	import EditSkills from './EditSkills.svelte';
	import StatsRow from '$lib/Characters/Components/CharacterSheet/StatsRow.svelte';

	/**
	 * @type {DC.Character}
	 */
	export let character;
	let currentTab = 'profile';
</script>

<div class="character-editor-container">
	<div class="tabs">
		<button
			title="profile"
			class="aug-button tab"
			class:active={currentTab === 'profile'}
			data-augmented-ui
			on:click={() => (currentTab = 'profile')}
			><i class="bi bi-file-person" /><span>Profile</span></button
		>
		<button
			title="story"
			class="aug-button tab"
			class:active={currentTab === 'story'}
			data-augmented-ui
			on:click={() => (currentTab = 'story')}
			><i class="bi bi-file-text" />
			<span>Story</span></button
		>
		<button
			title="tech"
			class="aug-button tab"
			class:active={currentTab === 'tech'}
			data-augmented-ui
			on:click={() => (currentTab = 'tech')}><i class="bi bi-file-lock" /><span>Tech</span></button
		>
		<button
			title="skills"
			class="aug-button tab"
			class:active={currentTab === 'skills'}
			data-augmented-ui
			on:click={() => (currentTab = 'skills')}
			><i class="bi bi-file-code" /><span>Skills</span></button
		>
		<button
			title="appearance"
			class="aug-button tab"
			class:active={currentTab === 'appearance'}
			data-augmented-ui
			on:click={() => (currentTab = 'appearance')}
			><i class="bi bi-file-image" /><span>Appearance</span></button
		>
	</div>
	<div class="tabs-container">
		{#if currentTab === 'profile'}
			<ProfileEditor bind:character />
		{:else if currentTab === 'tech'}
			<ListsRow bind:character isEditing={true} />
		{:else if currentTab === 'skills'}
			<EditSkills bind:character />
		{:else if currentTab === 'story'}
			<CharacterStory bind:character />
		{:else if currentTab === 'appearance'}
			<StatsRow bind:character isEditing={false} />
		{/if}
	</div>
</div>

<style>
	.character-editor-container {
		display: grid;
		grid-template-rows: min-content auto;
		height: 100%;
		color: var(--light);
		overflow: hidden;
	}
	.tabs {
		display: flex;
		justify-content: space-around;
		padding-bottom: 2em;
	}

	.tab {
		padding: 10px;
		cursor: pointer;

		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 1px;
		--aug-tl1: 0rem;
		--aug-tr1: 0rem;
		--aug-br1: 0rem;
		--aug-bl1: 0rem;
		--aug-border-bg: radial-gradient(circle at top left, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at top right, var(--blue) 20px, transparent 30px),
			radial-gradient(circle at bottom right, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at bottom left, var(--blue) 20px, transparent 30px);

		--aug-inlay: initial;
		--aug-inlay-bg: #ffffff1e;
	}
	.tab:first-of-type {
		--aug-tl1: 1rem;
		--aug-tr1: 0rem;
		--aug-br1: 0rem;
		--aug-bl1: 0.5rem;
	}

	.tab:last-of-type {
		--aug-tl1: 0rem;
		--aug-tr1: 1rem;
		--aug-br1: 0.5rem;
		--aug-bl1: 0rem;
	}

	.tab span {
		white-space: nowrap;
		margin-left: 0.5rem;
		overflow: hidden;
		visibility: visible;
	}
	.tabs-container {
		display: grid;
		min-height: 100%;
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.tab span{
			display: none;
		}
		.tab i {
			font-size: larger;
		}
	}
</style>
