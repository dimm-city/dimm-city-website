<script>
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import { districts } from './LocationStore';
	import { createEventDispatcher, onMount } from 'svelte';
	import { getDistricts } from './getDistricts';

	export let selectedItem = '';
	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			if ($districts?.length < 1) {
				let data = await getDistricts();
				$districts = data.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					else return -1;
				});
				resolve(data);
			} else resolve($districts);
		});
	});
	function selectItem(item) {
		selectedItem = item.slug;
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
</style>

{#await query}
	<LoadingIndicator>
		<div>Loading location data...</div>
	</LoadingIndicator>
{:then}
	{#if $districts != null}
		{#each $districts as district}
			<MenuItem url="/locations/{district.slug}" on:click={() => selectItem(district)}>
				<p><i class="bi bi-person text-light" />{district.name}</p>
				<small>
					{#if district.description}
						<div />
					{:else}
						<div>Unknown location</div>
					{/if}
				</small>

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
		<div class="item-container">&nbsp;</div>
	{/if}
{:catch e}
	<div>{e}</div>
{/await}
