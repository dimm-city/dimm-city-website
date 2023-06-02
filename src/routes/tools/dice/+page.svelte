<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dice from '$lib/Shared/Components/Dice/Dice.svelte';
	let diceNotation = '1d20';
	let selectedDice = {
		name: 'pink',
		foreground: 'white',
		background: '#ef1ebf',
		texture: 'glass',
		description: 'Default pink dice'
	};
	let roller;

	async function rollDice(e) {
		if (e.key === 'Enter') {
			await roller.roll();
		}
	}

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
			name: 'purple',
			foreground: 'white',
			background: '#c743ff',
			texture: 'glass',
			description: 'Default dice'
		}
	];
</script>

<Shell title="Dimm City: Dice">
	<ContentPane padding={2}>
		<div>
			<h4>
				Roll your dice <small class="text-secondary"
					>enter the dice notation and press enter or click below</small
				>
			</h4>
			<input type="text" bind:value={diceNotation} on:keyup={rollDice} />
			<!-- <select id="diceSelect" bind:value={selectedDice}>
				<option value={null}>Please select a dice theme</option>
				{#each diceThemes as theme}
					<option value={theme}>{theme.name}</option>
				{/each}
			</select> -->
			<Dice
				bind:this={roller}
				dice={selectedDice}
				{diceNotation}
				on:rollCompleted={(result) => console.log('rolled', result?.detail?.total)}
			>
				<span />
			</Dice>
		</div>
	</ContentPane>
</Shell>

<style>
	h4 {
		margin: 0;
	}
	div {
		margin-bottom: 3rem;
	}
</style>
