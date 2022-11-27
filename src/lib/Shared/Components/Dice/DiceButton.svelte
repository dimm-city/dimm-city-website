<script>
    import DiceRollerModal from './DiceRollerModal.svelte';
	import { openModal } from 'svelte-modals';
	function showDice() {
		openModal(DiceRollerModal, { fullscreen: true });
	}
</script>
<button on:click={showDice} data-augmented-ui="all-hex border"
			><img src="/assets/icons/dice256.png" height="24" width="24" alt="dice icon" /></button
		>