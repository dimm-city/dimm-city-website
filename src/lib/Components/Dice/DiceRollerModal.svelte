<ModalShell {fullscreen}>
	<D20 {color}/>
</ModalShell>

<script>
	import ModalShell from '$lib/ModalShell.svelte';
	import D20 from './d20.svelte';

	export let color = 'white';
    export let fullscreen = false;
</script>
