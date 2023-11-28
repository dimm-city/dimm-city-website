<script>

	/**
	 * @type {DC.Character}
	 */
	export let character;

	/**
	 * @type {DC.SkillTree}
	 */
	 export let selectedSkillTree;


	/**
	 * @type {DC.SkillTree[]}
	 */
	export let skillTrees = [];

</script>

<div>
	<h1>Select a Skill Tree</h1>
	<ul>
		{#each skillTrees as skillTree}
			<li on:click={() => selectedSkillTree = skillTree}>
				{skillTree.attributes.name}
			</li>
		{/each}
	</ul>
</div>