
<script>
	import ModalShell from '$lib/Shared/Components/ModalShell.svelte';
	import TokenView from './TokenView.svelte';
	export let data;
	export let isOpen;
</script>
<ModalShell>
	<TokenView {data} />
</ModalShell>
