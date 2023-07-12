<ModalShell {fullscreen}>
	<Dice {dice}/>
</ModalShell>

<script>
	import ModalShell from '$lib/Shared/Shell/ModalShell.svelte';
	import Dice from './Dice.svelte';

	export let color = 'white';
    export let fullscreen = false;

	const dice = {
		name: 'pink',
		foreground: 'white',
		background: '#ef1ebf',
		texture: 'glass',
		description: 'Default pink dice'
	};
</script>
