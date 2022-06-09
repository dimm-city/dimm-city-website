
<script>
	import ModalShell from '$lib/ModalShell.svelte';
	import TokenView from './TokenView.svelte';
	export let data;
	export let isOpen;
</script>
<ModalShell>
	<TokenView {data} />
</ModalShell>
