<script lang="ts">
	import ModalShell from '$lib/Shared/Components/ModalShell.svelte';
	import markdownit from 'markdown-it';

	export let data: any = {};
	const md = new markdownit();

	function loadAbility(id: Number): any {
		return data;
	}
</script>

<ModalShell fullscreen={true}>
	
		<div>{@html md.render(data)}</div>
	
</ModalShell>

<style>
	
</style>
