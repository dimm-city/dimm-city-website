<script>
	export let character;
	export let isEditing = false;
	export let isPrinting = false;
</script>

<div class="points-container">
	<div class="hp">
		<h4>HP</h4>
		<div data-augmented-ui="all-hex border">
			<span contenteditable="{isEditing}">{character?.hp ?? (isPrinting ? ' ' : '10')}</span>
			<hr />
			<small>{isPrinting ? ' ' : '10'}</small>
		</div>
	</div>
	<div class="ap">
		<h4>AP</h4>
		<div data-augmented-ui="all-hex border">{character?.ap ?? ''}</div>
	</div>
</div>

<style>
	.points-container {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}
	span {
		margin-left: 0.5rem;
	}

	.hp > div,
	.ap > div {
		display: grid;
		place-content: center;
		overflow: visible;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
		padding: 2rem;
	}
	.hp h4,
	.ap h4 {
		position: relative;
		margin: 0;
	}
	.ap h4 {
		text-align: right;
	}
	.hp span {
		margin: 0;
		height: 19px;
	}
	.hp hr {
		border: none;		
		border-top: 1px solid var(--fourth-accent);
		width: 20px;
	}
	.hp small {
		display: block;
		font-size: 0.7rem;
		height: 10px;
	}
</style>
