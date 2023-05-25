<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import { Game } from '@dimm-city/dc-solo-rpg';
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
</script>

<Shell title="Console">
	<ContentPane padding={0}>
		<!-- <div class="content-container"> -->
			<!-- <LoggedInContainer>
				<div class="fade-in"> -->
			<link rel="stylesheet" href="/assets/styles/WAAStyles.css" />
			<Game {games} {players} selectedPlayer={players.at(1)} selectedGame={games.at(1)} />

			<!-- </div>
			</LoggedInContainer> -->
		<!-- </div> -->
	</ContentPane>
</Shell>
