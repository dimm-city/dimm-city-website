<script>
	import StatsRow from '../Characters/Components/CharacterSheet/StatsRow.svelte';
	import ListsRow from '../Characters/Components/CharacterSheet/ListsRow.svelte';
	import ProfileRow from '../Characters/Components/CharacterSheet/ProfileRow.svelte';
	import Points from '../Characters/Components/CharacterSheet/Points.svelte';
	import StoryRow from '../Characters/Components/CharacterSheet/StoryRow.svelte';

	export let character;
</script>

<div class="tabs">
	<button class="tab" on:click={() => (currentTab = 'stats')}>Stats</button>
	<button class="tab" on:click={() => (currentTab = 'lists')}>Lists</button>
	<button class="tab" on:click={() => (currentTab = 'profile')}>Profile</button>
	<button class="tab" on:click={() => (currentTab = 'points')}>Points</button>
	<button class="tab" on:click={() => (currentTab = 'story')}>Story</button>
</div>

{#if currentTab === 'stats'}
	<StatsRow bind:character isEditing={true} />
{:else if currentTab === 'lists'}
	<ListsRow bind:character isEditing={true} />
{:else if currentTab === 'profile'}
	<ProfileRow bind:character isEditing={true} />
{:else if currentTab === 'points'}
	<Points bind:character isEditing={true} />
{:else if currentTab === 'story'}
	<StoryRow bind:character isEditing={true} />
{/if}

<button on:click={saveChanges}>Save Changes</button>

<script>
	let currentTab = 'stats';

	function saveChanges() {
		// Save the changes to the character data
	}
</script>

<style>
	.tabs {
		display: flex;
		justify-content: space-around;
	}

	.tab {
		padding: 10px;
		cursor: pointer;
	}

	.tab:hover {
		background-color: #ddd;
	}
</style>
