<script>
	import { gameState } from './model/Game';
	import '$lib/Shared/Styles/controls.css';
	import { ComputerPlayer } from './model/ComputerPlayer';
	import { RootKit } from './model/RootKit';
	import { Deck } from './model/Deck';

	let player = $gameState.player;
	let playersKit = new RootKit(5, 'external', [...new Deck().cards.slice(0, 5)]);
	let opponent = new ComputerPlayer('root');
	let minSlots = 1;
	let maxSlots = 7;
	let kitType = 'external';

	function start() {
		player.rootKit = playersKit;
		player.hitPoints = playersKit.getHitPoints();
		opponent.configureRootkit(minSlots, maxSlots, kitType);
		gameState.startGame(player, opponent);
	}
</script>

<style>
	.start-container {
		display: grid;
		gap: 1rem;
	}
	button {
		font-size: 1.5rem;
		padding: 0.5rem 1rem;
	}
</style>

<div class="start-container">
	<h4>Please enter your name:</h4>
	<input data-augmented-ui class="aug-input" type="text" placeholder="Your name" bind:value={player.name} />
	
	<button data-augmented-ui class="aug-button" on:click={() => start()}>connect</button>
</div>
