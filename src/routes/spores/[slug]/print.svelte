<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import PrintShell from '$lib/Spores/Components/PrintShell.svelte';
	import { page } from '$app/stores';
	import PrintSpore from '$lib/Spores/PrintSpore.svelte';
	export let slug = $page.params.slug;
</script>

<PrintShell>
		<PrintSpore {slug} />	
</PrintShell>
