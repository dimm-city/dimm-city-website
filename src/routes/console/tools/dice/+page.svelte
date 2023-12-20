<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dice from '$lib/Shared/Components/Dice/Dice.svelte';
	import DicePicker from '$lib/Shared/Components/Dice/DicePicker.svelte';

	let selectDice = false;
	let diceNotation = '1d20';
	let lastRoll = '';
	let selectedDice = {
		customTheme: {
			name: 'pink',
			foreground: 'white',
			background: '#ef1ebf',
			texture: 'glass',
			description: 'Default pink dice'
		}
	};
	/**
	 * @type {Dice}
	 */
	let roller;

	/**
	 * @param {{ key: string; }} e
	 */
	async function rollDice(e) {
		if (e.key === 'Enter') {
			lastRoll = await roller.roll();
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

<DicePicker bind:show={selectDice} bind:value={diceNotation} />
<Shell title="Dimm City: Dice">
	<ContentPane padding={0}>
		<div>
			<div class="header">
				<button on:click={() => (selectDice = true)}>{diceNotation}</button>
				{#if lastRoll?.total > 0}
					<h5 class="fade-in">last roll: {lastRoll?.total ?? ''}</h5>
				{/if}
			</div>
			<div class="dice-table">
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
					on:rollStarted={() => (lastRoll = null)}
					on:rollCompleted={(result) => (lastRoll = result?.detail)}
				>
					<span />
				</Dice>
			</div>
		</div>
	</ContentPane>
</Shell>

<style>
	.header {
		position: absolute;
		margin-inline: 2rem;
		top: 0;
		left: 0;
		right: 0;
		color: var(--fourth-accent);
	}
	.header button {
		color: var(--fourth-accent);
	}
	.dice-table {
		max-width: 100%;
		height: 100%;
	}
</style>
