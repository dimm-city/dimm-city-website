<script>
	import StatsRow from '../Characters/Components/CharacterSheet/StatsRow.svelte';
	import ListsRow from '../Characters/Components/CharacterSheet/ListsRow.svelte';
	import ProfileRow from '../Characters/Components/CharacterSheet/ProfileRow.svelte';
	import StoryRow from '../Characters/Components/CharacterSheet/StoryRow.svelte';

	/**
	 * @type {DC.Character}
	 */
	export let character;
	let currentTab = 'profile';

</script>

<div class="tabs">
	<button class="aug-button tab" data-augmented-ui on:click={() => (currentTab = 'profile')}
		>Profile</button
	>
	<button class="aug-button tab" data-augmented-ui on:click={() => (currentTab = 'story')}
		>Story</button
	>
	<button class="aug-button tab" data-augmented-ui on:click={() => (currentTab = 'tech')}
		>Tech</button
	>
	<button class="aug-button tab" data-augmented-ui on:click={() => (currentTab = 'skills')}
		>Skills</button
	>
	<button class="aug-button tab" data-augmented-ui on:click={() => (currentTab = 'points')}
		>Points</button
	>
</div>
<div class="tabs-container">
{#if currentTab === 'profile'}
	<StatsRow bind:character isEditing={true} />
	<ProfileRow bind:character isEditing={true} />
{:else if currentTab === 'tech'}
	<ListsRow bind:character isEditing={true} />
{:else if currentTab === 'skills'}
	<ProfileRow bind:character isEditing={true} />
{:else if currentTab === 'story'}
	<StoryRow bind:character isEditing={true} />
{/if}
</div>

<style>
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

    .tabs-container {
        display: gird;
        min-height: 100%;
    }
</style>
