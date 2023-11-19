<script>
	import SkillTree from '$lib/Abilities/SkillTree.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	/**
	 * @type {DC.SkillTree}
	 */
	export let data;
</script>

<Shell title={data?.attributes?.name} titleUrl="/console/skills">
	<SkillTree {data} />
</Shell>
