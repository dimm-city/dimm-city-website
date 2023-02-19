<script>
	import { gameState, states } from './model/Game';
	export let disabled;
</script>

<style>
	.game-controls {
		display: grid;
		grid-auto-flow: column;
		gap: 5rem;
		margin-block: 1.5rem;
	}
  button{
    font-size: 1.5rem;
		padding: 0.5rem 1rem;
  }
</style>

<div class="game-controls">
	{#if $gameState.currentState === states.START_SCREEN}
		<div />
	{:else if $gameState.currentState === states.SELECT_CARD}
		<button
			data-augmented-ui
			class="aug-button"
			disabled={disabled || $gameState.player.selectedCard == null}
			on:click={() => gameState.playTurn()}>
			execute script
		</button>
	{:else if $gameState.currentState === states.SHOW_CARDS}
		<button data-augmented-ui {disabled} class="aug-button" on:click={() => gameState.nextRound()}> continue </button>
	{:else if $gameState.currentState === states.GAME_OVER}
		<div />
	{/if}
</div>
