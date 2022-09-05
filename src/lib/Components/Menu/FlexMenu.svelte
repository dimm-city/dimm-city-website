<script>
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import { createEventDispatcher } from 'svelte';
	export let query;
	export let data;
	export let selectedItem = '';

	const dispather = createEventDispatcher();

	function selectItem(item) {
		selectedItem = item.detail;
		dispather('itemSelected', item);
		return true;
	}
</script>

<style>
	.flex-menu {
		display: flex;
		flex-wrap: wrap;
		margin: 0.5rem;
		min-width: 300px;
		justify-content: center;
	}
	.flex-menu > div {
		flex: 1 1 350px;
		margin: 0.25rem;
		max-width: 500px;
        overflow: hidden;
		margin-inline: 0.5rem;
	}

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

	.subtitle {
		min-width: min-content;
		white-space: nowrap;
	}

	.menu-item-header {
		margin-top: 0.5rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
		/* white-space: nowrap; */
	}
	.menu-item-header .title-container {
		max-width: 100ch;
		text-overflow: ellipsis;
        overflow: hidden;
		white-space: nowrap;
	}

	.description {
		margin-block: 0.25rem;
		white-space: normal;
		text-overflow: clip;
	}

	@media (max-width: 650px) {
		.subtitle {
			display: none;
		}
		.title-container {
			max-width: 350px;
		}
	}
	@media (max-width: 450px) {
		.subtitle {
			display: none;
		}
		.title-container {
			max-width: 100%;
		}
	}
   
</style>

<div class="flex-menu">
	{#await query}
		<LoadingIndicator>
			<div>Loading data...</div>
		</LoadingIndicator>
	{:then}
		{#if data != null}
			{#each data as item}
				<div class="flex-menu-item">
					<MenuItem on:click={() => selectItem(item)} classes="small">
						<div class="menu-item-header" style="">
							<slot name="item-header" {item}>
								<div class="title-container"><i class="bi bi-file-text text-light" />{item.name}</div>
							</slot>
							<slot name="subtitle" {item}>
								<div class="subtitle"><small>&thickapprox;</small></div>
							</slot>
						</div>
						<div class="description">
							<slot {item} name="description">
								<small>{item.description}</small>
							</slot>
						</div>
						<slot name="item-toolbar" {item}>
							<div class="toolbar">
								<!-- <a
                target="_blank"
                on:click|stopPropagation={() => true}
                href="/citizens/print/{character.attributes.tokenId}"
            >
                <i class="bi bi-printer" />
            </a> -->
							</div>
						</slot>
					</MenuItem>
				</div>
			{/each}
		{/if}
	{:catch e}
		<div>{e}</div>
	{/await}
</div>
