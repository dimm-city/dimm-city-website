<script lang="ts">
	import List from './List.svelte';
	export let item;
	export let baseUrl = '';
</script>

<style>
	a {
color: var(--fourth-accent);
	}
</style>

{#if item != null}
	<li>
		<a href="{baseUrl}/{item.slug}">{item.name}</a>
		<List data={item.children} baseUrl={item.slug} classes="inner-list" />
	</li>
{/if}
