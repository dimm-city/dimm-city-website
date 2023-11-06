<script>
	import PrintShell from '$lib/Shared/Shell/PrintShell.svelte';
	import Sheet from '$lib/Characters/Components/CharacterSheet/Sheet.svelte';
	import '$lib/Characters/Components/CharacterSheet/sheet-print.css';
	export let data;
</script>

<PrintShell title={data?.attributes?.name ?? 'Citizen File'}>
	<Sheet character={data} isPrinting={true} />
</PrintShell>
