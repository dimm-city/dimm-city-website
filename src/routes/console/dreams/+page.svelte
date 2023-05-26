<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import { Game } from '@dimm-city/dc-solo-rpg';
	import { onMount } from 'svelte';
	let selectedPlayer = null;
	let selectedDice = null;
	let selectedGame = null;
	const games = [
		{ title: 'WAA Game Template', url: '/waa/Example.json' },
		{ title: 'Future Lost', url: '/waa/future-lost.json' }
	];
	let players = [
		{
			name: 'Ralph'
		},
		{
			name: 'murmur'
		}
	];

	let diceThemes = [
		{ name: 'pink', color: '#ef1ebf' },
		{ name: 'blue', color: '#3e6ab3' },
		{ name: 'purple', color: '#c743ff' }
	];

	onMount(() => {
		selectedDice = diceThemes.at(0);
		selectedPlayer = players.at(1);
		selectedGame = games.at(1);
	});
</script>

<Shell title="Console">
	<ContentPane padding={0}>
		<!-- <div class="content-container"> -->
		<!-- <LoggedInContainer>
				<div class="fade-in"> -->
		<link rel="stylesheet" href="/assets/styles/WAAStyles.css" />
		<Game {games} {players} {selectedPlayer} {selectedGame} {diceThemes} {selectedDice} />

		<!-- </div>
			</LoggedInContainer> -->
		<!-- </div> -->
	</ContentPane>
</Shell>
