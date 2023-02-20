<script>
	import { gameState } from './model/Game';
	import '$lib/Shared/Styles/controls.css';
	import { ComputerPlayer } from './model/ComputerPlayer';
	import { kit_types, RootKit } from './model/RootKit';
	import { Deck } from './model/Deck';
	import { ComputerPlayerSettings } from './model/ComputerPlayerSettings';
	import { Player } from './model/Player';

	let availableCards = [...new Deck().cards];

	let opponentSettings = new ComputerPlayerSettings(availableCards);
	let playersKit = new RootKit(4, kit_types.EXTERNAL, []);

	let player = $gameState.player ?? new Player("Player 1", playersKit);
	let opponent =  $gameState.opponent ?? new ComputerPlayer('root', opponentSettings);


	function start() {
		playersKit.cards = availableCards.sort((a, b) => Math.random() - 0.5).slice(0, playersKit.slots)
		player.rootKit = playersKit;
		player.hitPoints = playersKit.getHitPoints();
		opponent = new ComputerPlayer(opponent.name, opponentSettings);
		gameState.startGame(player, opponent);
	}
</script>

<style>
	.start-container {
		display: grid;
		gap: 1rem;
	}
	label {
		font-size: 0.9rem;
	}
	button {
		font-size: 1.5rem;
		padding: 0.5rem 1rem;
	}
</style>

<div class="start-container">
	<h4>Please enter your name:</h4>
	<label for="player-name">Name</label>
	<input data-augmented-ui class="aug-input" type="text" placeholder="Your name" bind:value={player.name} />
	<label for="player-slots">RootKit slots</label>
	<input data-augmented-ui class="aug-input" type="text" placeholder="Slots" bind:value={playersKit.slots} />
	<hr />
	<h4>Opponent: {opponent?.name}</h4>
	<!-- <RangeSlider range pushy values={[opponentSettings.minSlots,opponentSettings.maxSlots]} /> -->
	<label for="max-slots">Max RootKit slots</label>
	<input data-augmented-ui class="aug-input" type="text" placeholder="Max Slots" bind:value={opponentSettings.maxSlots} />
	<label for="max-atk">Max Attack</label>
	<input data-augmented-ui class="aug-input" type="text" placeholder="Max Attack" bind:value={opponentSettings.maxAttack} />
	<label for="max-def">Max Defense</label>
	<input data-augmented-ui class="aug-input" type="text" placeholder="Max Defense" bind:value={opponentSettings.maxDefense} />
	<button data-augmented-ui class="aug-button" on:click={() => start()}>connect</button>
</div>
