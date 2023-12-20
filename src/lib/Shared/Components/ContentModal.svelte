<script lang="ts">
	import ModalShell from '$lib/Shared/Shell/ModalShell.svelte';
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	import markdownit from 'markdown-it';

	export let data: any = {};
	export let isEditing = false;
	export let onClose = (data) =>{
		return data;
	};
	const md = new markdownit();
</script>

<ModalShell fullscreen={true} dismiss={() => onClose(data)}>
	{#if isEditing}
		<Textarea bind:value={data} />
	{:else}
		<div>{@html md.render(data ?? '')}</div>
	{/if}
</ModalShell>

<style>
</style>
