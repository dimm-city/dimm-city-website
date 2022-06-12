<script>
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import { specialties } from '$lib/ShellStore';
	import { onMount } from 'svelte';
	import { getSpecialties } from './getSpecialties';

	let query;
	onMount(() => {
		query = new Promise(async (resolve) => {
			if ($specialties?.length < 1) {
				let data = await getSpecialties();
				if (data != null) {
					$specialties = data.sort((a, b) => {
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						else return -1;
					});
				}
				resolve(data);
			} else resolve($specialties);
		});
	});
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
	{#if $specialties != null}
		{#each $specialties as item}
			<MenuItem url="/specialties/{item.slug}">
				<p><i class="bi bi-person text-light" />{item.name}</p>
				<small>
					{#if item.description}
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
