<script>
	import Dialog from '../Dialog.svelte';

	export let show = false;
	const diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
	const maxDice = 10;
	let selectedDiceType = 'd20';
	let numberOfDice = 1;

	export let value = `${numberOfDice}${selectedDiceType}`;
	$: value = `${numberOfDice}${selectedDiceType}`;
</script>

<Dialog bind:show>
	<div class="dice-picker">
		<div class="dice-types">
			{#each diceTypes as type}
				<button
					on:click={() => (selectedDiceType = type)}
					class:selected={selectedDiceType === type}
				>
					{type}
				</button>
			{/each}
		</div>
		<div class="dice-numbers">
			{#each Array(maxDice)
				.fill(0)
				.map((_, i) => i + 1) as number}
				<button on:click={() => (numberOfDice = number)} class:selected={numberOfDice === number}>
					{number}
					{number === 1 ? 'die' : 'dice'}
				</button>
			{/each}
		</div>
	</div>
</Dialog>

<style>
	.dice-picker {
		display: flex;
		flex-direction: column;
	}
	.dice-types,
	.dice-numbers {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
		gap: 10px;
		margin-bottom: 20px;
	}
	button {
		padding: 10px;
		border: 1px solid #ccc;
		background-color: #fff;
		cursor: pointer;
	}
	button.selected {
		border-color: #007bff;
		background-color: #007bff;
		color: white;
	}
</style>
