<script>
	import ItemsList from '$lib/Characters/Components/CharacterSheet/ItemsList.svelte';
	import Article from '$lib/Shared/Components/Article.svelte';

	/** @type {DC.Race}*/
	export let race;
</script>

<Article model={race}>
	<section class="grid">
		<div>
			<p><strong>HP:</strong> {race.attributes.hp}</p>
			<p><strong>ATK:</strong> {race.attributes.atk}</p>
			<p><strong>Playable:</strong> {race.attributes.playable ? 'Yes' : 'No'}</p>

			<h4>Common locations</h4>
			<ul>
				{#each race.attributes.locations.data as location}
					<li>{location.attributes.name}</li>
				{/each}
			</ul>
			<p>
				<strong>Appearance:</strong>
				<span>{race.attributes.appearance ?? 'Unknown'}</span>
			</p>
		</div>
		<div>
			<!-- <div><h4>Occupations:</h4><p>{race.attributes.occupations}</p> </div> -->
			<h4>Allies</h4>
			<ul>
				{#each race.attributes.allies.data as ally}
					<li>{ally.attributes.name}</li>
				{/each}
			</ul>
			<h4>Enemies</h4>
			<ul>
				{#each race.attributes.enemies.data as enemy}
					<li>{enemy.attributes.name}</li>
				{/each}
			</ul>
			<div class="skills-container" data-augmented-ui="tl-clip tr-clip br-2-clip-xy bl-clip border">
				<ItemsList
					header="Skills"
					noItemsText="no skills registered"
					data={race.attributes.abilities?.data}
				/>
			</div>
		</div>
	</section>
	<section>
		<h3>Ideals</h3>
		<p>{race.attributes.ideals ?? 'Unknown'}</p>

		<h3>Flaws</h3>
		<p>{race.attributes.flaws ?? 'Unknown'}</p>

		<h3>Problems</h3>
		<p>{race.attributes.problems ?? 'Unknown'}</p>

		<h3>Description</h3>
		<p>{race.attributes.description ?? 'Unable to locate description.'}</p>
	</section>
	<section />
</Article>

<style>
	h4 {
		margin: 0;
		color: var(--fourth-accent);
	}
	strong {
		color: var(--fourth-accent);
	}
	ul {
		padding: 0;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.skills-container {
		--aug-br: var(--default-aug);

		--aug-border-all: 1px;
		padding: 1em;
	}

    :global(.skills-container .section-title){
        justify-content: flex-start;
    }

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
