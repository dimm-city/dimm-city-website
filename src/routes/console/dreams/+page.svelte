<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import { wallets } from '$lib/Shared/Stores/UserStore';
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

	let tokens = [];
	$: if($wallets?.length > 0)
		tokens = $wallets?.flatMap(w => w.tokens) ?? [];
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
		players = [{ name: 'Guest' }, ...tokens.filter((t) => t != null).map(t => t.metadata)];
		//console.log(players, tokens, $wallets);

		selectedDice = diceThemes.at(0);
		selectedPlayer = players.at(0);
		selectedGame = games.at(1);
	});
</script>

<Shell title="Dream Console">
	<ContentPane padding={0}>
		<link rel="stylesheet" href="/assets/styles/WAAStyles.css" />
		<!-- <LoggedInContainer> -->
			<Game {games} {players} {selectedPlayer} {selectedGame} {diceThemes} {selectedDice} />
		 <!-- </LoggedInContainer>  -->
	</ContentPane>
</Shell>
