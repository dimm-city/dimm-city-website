<script>
	import List from './List.svelte';

	/**
	 * @type {{ slug: any; name: any; children: any; } | null}
	 */
	export let item;
	export let baseUrl = '';
</script>

{#if item != null}
	<li>
		<a href="{baseUrl}/{item.slug}">{item.name}</a>
		<List data={item.children} baseUrl={item.slug} classes="inner-list" />
	</li>
{/if}

<style>
	a {
		color: var(--fourth-accent);
	}
</style>
