<script>
	import SkillTreeSelector from './SkillTreeSelector.svelte';
	import SkillTree from './SkillTree.svelte';
	import DetailsPanel from './DetailsPanel.svelte';

	/**
	 * @type { DC.SkillTree[]}
	 */
	let skillTrees = [];
	/**
	 * @type {DC.SkillTree}
	 */
	let selectedSkillTree;
	/**
	 * @type {DC.Character}
	 */
	export let character;
</script>

<div>
	{#if selectedSkillTree}
		<SkillTree selectedSkillTree={selectedSkillTree} />

		<DetailsPanel side="left">
			<div class="specialty-details">
				<h1><i class="bi bi-icon-name" />{selectedSkillTree.attributes.name}</h1>
				<div>
					<h3>
						<i class="bi bi-icon-type" />Specialty: {selectedSkillTree.attributes.specialty?.data
							?.attributes.name}
					</h3>
					<h4>Additional Skill Trees</h4>
					{#if skillTrees?.length > 0}
						{#each skillTrees as tree}
							<a href={tree.attributes.slug}>
								<div data-augmented-ui class="small-menu-item">
									<h5><i class="bi bi-icon-type" />{tree.attributes.name}</h5>
								</div>
							</a>
						{/each}
					{/if}
				</div>
			</div>
		</DetailsPanel>
	{:else}
		<SkillTreeSelector bind:selectedSkillTree bind:skillTrees {character} />
	{/if}
</div>
