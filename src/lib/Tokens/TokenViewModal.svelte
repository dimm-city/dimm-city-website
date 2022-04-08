
<script>
	import ModalShell from '$lib/ModalShell.svelte';
	import TokenView from './TokenView.svelte';
	export let data;
</script>
<ModalShell>
	<TokenView {data} />
</ModalShell>
