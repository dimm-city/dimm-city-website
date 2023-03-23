<script lang="ts">
	import Image from '$lib/Shared/Components/Image.svelte';
	import List from '$lib/Shared/Components/List.svelte';
	export let character;
</script>

<div class="stats-row" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both">
	<div><h3 class="section-title">Physical Stats</h3></div>
	<div>
		<div class="stats-container">
			<div class="image">
				<Image imageUrl={character.imageUrl} title="Profile" height="200px" width="150px" />
			</div>
			<div class="physical-stats">
				<div>
					Pronouns:
					<span>{character.pronouns || 'they/them'}</span>
				</div>
				<div>
					Age:
					<span>{character.age ?? 'Unknown'} </span>
				</div>
				<div>
					Race:
					<span>
						{#if character.race}
							{character.race.data.attributes.name}
						{/if}
					</span>
				</div>
				<div>
					Height:
					<span>{character.height || 0} m</span>
				</div>
				<div>
					Weight:
					<span>{character.weight || 0} kg</span>
				</div>
				<div>
					Eyes:
					<span>{character.eyes || ''}</span>
				</div>
				<div>
					Skin:
					<span>{character.skin || ''}</span>
				</div>
				<!-- <div>
                Hair:
                <span>{character.hair || ''}</span>
            </div> -->
			</div>
		</div>
		<div class="scores-container">
			<div data-augmented-ui="all-hex border" class="hp"><span>10</span><small>/10</small></div>
			<div data-augmented-ui="all-hex border" class="ap">10</div>
		</div>
		<div class="cybernetics-container">
			<h3 class="section-title">Cybernetics</h3>
			<List />
		</div>
	</div>
</div>

<style>
	.stats-row {
		display: grid;
		grid-template-columns: 1.25fr 0.5fr 1.25fr;
		grid-template-rows: min-content max-content;
		padding: 1rem;
		padding-top: 2.5rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
	}

	.stats-container {
		position: relative;
		display: flex;
		flex-direction: row;
	}
	.image {
		padding: 0.5rem;
	}
	:global(.image > div) {
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}
	.physical-stats {
		width: 100%;
		height: 100%;
		display: grid;
		margin-left: 0.2rem;
		gap: 0.2rem;
	}

	.scores-container {
		display: grid;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	.hp,
	.ap {
		display: grid;
		padding: 2rem;
		place-content: center;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}

	.cybernetics-container {
		position: relative;
	}
</style>
