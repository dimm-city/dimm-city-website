<script>
	import PrintShell from '$lib/Spores/Components/PrintShell.svelte';
	import PrintSpore from '$lib/Spores/PrintSpore.svelte';
	export let data;
</script>

<PrintShell>
	<PrintSpore spore={data} />
</PrintShell>
