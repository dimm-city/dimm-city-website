<script>
	import SkillTreeSelector from './SkillTreeSelector.svelte';
	import SkillTree from './SkillTree.svelte';

	let selectedSkillTree;
</script>

<div>
	<SkillTreeSelector bind:selectedSkillTree />
	{#if selectedSkillTree}
		<SkillTree {selectedSkillTree} />
	{/if}
</div>
