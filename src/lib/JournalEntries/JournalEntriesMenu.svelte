<script>
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import { formatDate } from '$lib/Shared/FormatFunctions';
	import { showMenu } from '$lib/Shared/ShellStore';
	import { onMount } from 'svelte';
	import { getJournalEntries } from './getJournalEntries';
	import { JournalEntry } from './JournalEntry';

	export let selectedItem = '';
	let journalEntries = [];
	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			if (journalEntries?.length < 1) {
				let data = await getJournalEntries();
				if (data != null) {
					journalEntries = data.sort((a, b) => {
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						else return -1;
					});
				}
				resolve(data);
			} else resolve(journalEntries);
		});
	});

	function selectItem(item) {
		selectedItem = item.slug;
		$showMenu = false;
		return true;
	}
</script>

<style>
	.toolbar {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
	.toolbar a,
	.toolbar a:visited {
		color: var(--third-accent);
		transition: color 500ms ease-in-out;
	}
	.toolbar a:hover,
	.toolbar a:active {
		color: var(--primary-accent);
		transition: color 500ms ease-in-out;
	}

	.item-container {
		margin-bottom: 5em;
		width: 100%;
	}

	.menu-item-header {
		margin-top: 0.5rem;
		display: flex;
		justify-content: space-between;
		/* white-space: nowrap; */
	}
	.menu-item-header .title-container {
		max-width: 30%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		max-width: 10ch;
	}

	.description {
		white-space: normal;
		max-width: 20ch;
	}
</style>

{#await query}
	<LoadingIndicator>
		<div>Loading data...</div>
	</LoadingIndicator>
{:then}
	{#if journalEntries != null}
		{#each journalEntries as item}
			<MenuItem url="/journal-entries/{item.slug}" on:click={selectItem} classes="small">
				<div class="menu-item-header" style="">
					<div class="title-container"><i class="bi bi-file-text text-light" />{item.name}</div>
					<div><small>&thickapprox; {formatDate(item.recordedAt)}</small></div>
				</div>
				<div class="description"><small>{item.description}</small></div>
				<div class="toolbar">
					<!-- <a
						target="_blank"
						on:click|stopPropagation={() => true}
						href="/citizens/print/{character.attributes.tokenId}"
					>
						<i class="bi bi-printer" />
					</a> -->
				</div>
			</MenuItem>
		{/each}
		<MenuItem>Test 01</MenuItem>
		<MenuItem>Test 01</MenuItem>
		<MenuItem>Test 01</MenuItem>
		<div class="item-container">&nbsp;</div>
	{/if}
{:catch e}
	<div>{e}</div>
{/await}
