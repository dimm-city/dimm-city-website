<script>
	// @ts-nocheck

	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import { wallets } from '$lib/Shared/Stores/UserStore';
	import { Game, GameSelector, currentScreen, SystemSettings } from '@dimm-city/dc-solo-rpg';
	import { onMount } from 'svelte';
	let selectedPlayer = null;
	let selectedDice = null;
	let selectedGame = null;
	const games = [
		{ title: 'Future Lost', url: '/games/future-lost/' },
		{ title: 'WAA Game Template', url: '/games/full-example' }
	];
	let players = [
		{
			name: 'Ralph'
		},
		{
			name: 'murmur'
		}
	];

	let tokens = [];
	$: if ($wallets?.length > 0) tokens = $wallets?.flatMap((w) => w.tokens) ?? [];
	let diceThemes = [
		{
			name: 'pink',
			foreground: 'white',
			background: '#ef1ebf',
			texture: 'glass',
			description: 'Default pink dice'
		},
		{
			name: 'blue',
			foreground: 'white',
			background: '#3e6ab3',
			texture: 'glass',
			description: 'Default blue dice'
		},
		{
			name: 'pruple',
			foreground: 'white',
			background: '#c743ff',
			texture: 'glass',
			description: 'Default dice'
		}
	];

	onMount(() => {
		players = [{ name: 'Guest' }, ...tokens.filter((t) => t != null).map((t) => t.metadata)];
		//console.log(players, tokens, $wallets);

		selectedDice = diceThemes.at(0);
		selectedPlayer = players.at(0);
		selectedGame = games.at(1);
	});

	let gameComponent;
	let systemSettings = new SystemSettings();
	let ready = false;
	function loadGame() {
		ready = true;
		systemSettings.gameConfigUrl = selectedGame.url;
		systemSettings.player = selectedPlayer;
		gameComponent.startGame();
	}
	function onJournalSaved(journal) {
		console.log('onJournalSaved', journal);
	}
	function onGameOver(params) {
		console.log('onGameOver', params);
	}
	function onExitGame(params) {
		console.log('onExitGame', params);
		ready = false;
	}
	$: {
		if ($currentScreen === 'gameOver') ready = true;
		console.log('ready changed', ready, $currentScreen);
	}
</script>

<Shell title="Dream Console">
	<ContentPane padding={1}>
		<!-- <LoggedInContainer> 
			<Game {games} {players} {selectedPlayer} {selectedGame} {diceThemes} {selectedDice} />
		  </LoggedInContainer>  -->

		<div class="game-container" class:hidden={!ready || $currentScreen == 'loadGame'}>
			<Game
				bind:this={gameComponent}
				{systemSettings}
				on:dc-solo-rpg.journalSaved={onJournalSaved}
				on:dc-solo-rpg.gameOver={onGameOver}
				on:dc-solo-rpg.exitGame={onExitGame}
			/>
		</div>
		<div class="welcome-container" class:hidden={ready && $currentScreen != 'loadGame'}>
			<section class="hero">
				<h1>Dimm City Solo RPG</h1>
				<p>Demo</p>
			</section>
			<GameSelector
				{games}
				{players}
				bind:selectedPlayer
				bind:selectedGame
				on:dc-solo-rpg.gameSelected={loadGame}
			/>
		</div>
	</ContentPane>
</Shell>

<style>
	.hidden {
		display: none;
	}
</style>
