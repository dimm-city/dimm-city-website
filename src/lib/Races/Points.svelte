<script>
	/** @type DC.Race */
	export let data;
	export let isEditing = false;
	export let isPrinting = false;
</script>

<div class="points-container">
	<div class="hp">
		<h4>HP</h4>
		<div data-augmented-ui="all-hex border" contenteditable="{isEditing}">{data?.attributes.hp ?? (isPrinting ? ' ' : '10')}</div>
	</div>
	{#if data.attributes.atk}
	<div class="ap">
		<h4>ATK</h4>
		<div data-augmented-ui="all-hex border" contenteditable="{isEditing}">{data?.attributes.atk ?? ''}</div>
	</div>
	{/if}
</div>

<style>
	.points-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding-right: .25rem;
	}

	.ap,.hp{
		position: relative;
	}
	.hp > div,
	.ap > div {
		display: grid;
		place-content: center;
		overflow: visible;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
		padding: 1.35rem;
	}
	.hp h4,
	.ap h4 {
		position: absolute;
		font-size: 0.5em;
		bottom: -1em;
		margin: 0;
	}
	.ap h4 {
		text-align: right;
		right: -5px;
	}
@media screen and (max-width: 768px) {
	.points-container {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		padding-right: unset;
	}
	.ap, .hp{
		font-size: large;
	}
		.hp > div,
	.ap > div {
		padding: 2rem;
	}
	.hp h4,
	.ap h4 {
		font-size: 0.75em;
		bottom: -1em;
	}
}
</style>
