
<script>
	import ModalShell from '$lib/Shared/Components/ModalShell.svelte';
	import TokenView from './TokenView.svelte';
	export let token;
	export let isOpen;
</script>
<ModalShell>
	{#if isOpen}
	<TokenView token={token} />
	{/if}
</ModalShell>
