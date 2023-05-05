<script lang="ts">
	
	import type { ICharacter } from '$lib/Characters/Models/Character';
	
	export let character: ICharacter;
	export let isEditing = false;
</script>

<div class="hp">
	<h4>HP</h4>
	<div data-augmented-ui="all-hex border">
		<span>10</span><small>10</small>
	</div>
</div>
<div class="ap">
	<h4>AP</h4>
	<div data-augmented-ui="all-hex border">10</div>
</div>

<style>
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
	}
	.hp small {
		display: block;
		border-top: 1px solid var(--fourth-accent);
		font-size: 0.7rem;
	}
</style>
