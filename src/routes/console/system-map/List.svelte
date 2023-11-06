<script>
	import ListItem from './ListItem.svelte';
	/**
	 * @type {any[] | null}
	 */
	export let data = [];
	export let baseUrl = '';
	export let classes = '';
</script>

<ul class={classes}>
	{#if data != null}
		{#each data as item}
			<ListItem {item} {baseUrl} />
		{/each}
	{/if}
</ul>

<style>
	ul {
		list-style-type: none;
		position: relative;
		list-style-type: none;
		padding-left: 0;
		margin-bottom: 0.5rem;
	}
</style>
