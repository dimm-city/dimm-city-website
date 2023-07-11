
<script>
	import ModalShell from '$lib/Shared/Shell/ModalShell.svelte';
	import TokenView from './TokenView.svelte';
	/**
	 * @type {any}
	 */
	 export let token;
	/**
	 * @type {boolean}
	 */
	 export let isOpen;
</script>
<ModalShell>
	{#if isOpen}
	<TokenView token={token} />
	{/if}
</ModalShell>
