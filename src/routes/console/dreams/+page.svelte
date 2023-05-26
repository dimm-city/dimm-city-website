<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import { tokens } from '$lib/Shared/Stores/UserStore';
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
		players = [{ name: 'Guest' }, ...$tokens.filter((t) => t != null)];
		console.log(players);

		selectedDice = diceThemes.at(0);
		selectedPlayer = players.at(0);
		selectedGame = games.at(1);
	});
</script>

<Shell title="Dream Console">
	<ContentPane padding={0}>
		<link rel="stylesheet" href="/assets/styles/WAAStyles.css" />
		<LoggedInContainer>
			<Game {games} {players} {selectedPlayer} {selectedGame} {diceThemes} {selectedDice} />
		 </LoggedInContainer> 
	</ContentPane>
</Shell>
