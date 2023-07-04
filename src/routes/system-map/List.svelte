<script lang="ts">
	import ListItem from './ListItem.svelte';
	export let data: any[] | null = [];
	export let baseUrl = '';
	export let classes = '';
</script>

<style>
	ul {
		list-style-type: none;
		position: relative;
		list-style-type: none;
		padding-left: 0;
		margin-bottom: 0.5rem;
	}
</style>

<ul class={classes}>
	{#if data != null}
		{#each data as item}
			<ListItem {item} {baseUrl} />
		{/each}
	{/if}
</ul>
