<script>
	import Card from './Card.svelte';
	import { gameState } from './model/Game';
	export let disabled = false;
</script>

<style>
	.card-display-container {
		display: grid;
		width: 100%;
	}
	.card-display {
		display: grid;
		grid-auto-flow: column;
		gap: 2rem;
		width: 50%;
		justify-self: center;
	}

	@media (max-width: 575px) {
		.card-display {
			grid-auto-flow: row;
		}
	}
</style>

<div class="card-display-container">
	<div class="card-display">
		<Card card={$gameState.selectedCards.player} />
		<Card card={$gameState.selectedCards.opponent} />
	</div>
</div>