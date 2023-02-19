<script>
	import { gameState } from './model/Game';
</script>

<style>
	.game-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.player-health,
	.computer-health {
		font-size: 1.2rem;
		font-weight: bold;
	}

	.player-details {
		display: flex;
		flex-direction: column;
		font-weight: normal;
		font-size: 0.8rem;
	}
</style>

<div class="game-info">
	<div class="player-health">
		{$gameState.player.name} health: {$gameState.player.hitPoints}

		<div class="player-details">
			<span>kit type: {$gameState.player.rootKit.type}</span>
			<span>slots: {$gameState.player.rootKit.slots}</span>
			<span>hp: {$gameState.player.rootKit.getHitPoints()}</span>
			<span> <a data-augmented-ui on:click={() => gameState.startNewGame()}> quit </a></span>
		</div>
	</div>

	<div class="computer-health">
		{$gameState.opponent.name} health: {$gameState.opponent.hitPoints}
		<div class="player-details">
			<span>kit type: {$gameState.opponent.rootKit.type}</span>
			<span>slots: {$gameState.opponent.rootKit.slots}</span>
			<span>hp: {$gameState.opponent.rootKit.getHitPoints()}</span>			
		</div>
	</div>
	<!-- <div class="player-score">Your score: {playerScore}</div>
    <div class="computer-score">Computer score: {computerScore}</div> -->
</div>
