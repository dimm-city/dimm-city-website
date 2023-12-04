<script>
	import SkillTree from './SkillTree.svelte';
	import DetailsPanel from './DetailsPanel.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';

	import {
		loadSkillTree,
		selectedSkillTree,
		availableSkillTrees
	} from './BuilderStore.js';

</script>

<ContentPane scrollable={false}>
	<div class="section-container">
		{#if $selectedSkillTree?.id > 0}
			<SkillTree />
			<DetailsPanel side="left">
				<div class="specialty-details">
					<h1><i class="bi bi-icon-name" />{$selectedSkillTree.attributes.name}</h1>
					<div>
						<h3>
							<i class="bi bi-icon-type" />Specialty: {$selectedSkillTree.attributes.specialty?.data
								?.attributes.name}
						</h3>
						<h4>Additional Skill Trees</h4>
						{#if $availableSkillTrees?.length > 0}
							{#each $availableSkillTrees as tree}
								<button
									on:click={() => loadSkillTree(tree.attributes.slug)}
									data-augmented-ui
									class="small-menu-item"
								>
									<h5><i class="bi bi-icon-type" />{tree.attributes.name}</h5>
								</button>
							{/each}
						{/if}
					</div>
				</div>
			</DetailsPanel>
		{:else}
			<div>
				<h1>Select a Skill Tree</h1>
				<ul>
					{#each $availableSkillTrees as item}
						<li>
							<button
								data-augmented-ui
								class="small-menu-item"
								on:click={() => loadSkillTree(item.attributes.slug)}
							>
								{item.attributes.name}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</ContentPane>

<style>
	.section-container {
		padding-top: 1.5rem;
		padding-bottom: 3rem;
		padding-inline: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		height: 100%;
		align-items: start;
		gap: 3rem;
		overflow: hidden;
	}
	ul {
		margin: auto;
		padding: 0;
	}
	ul li:before {
		content: '';
	}
</style>
