<script>
	import SkillTree from '$lib/Abilities/SkillTree.svelte';
	import ItemView from '$lib/Items/ItemView.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
    /**
	 * @type {DC.SkillTree}
	 */
	export let data;
</script>

<Shell title={data?.attributes?.name} titleUrl="/skills">
	<ContentPane padding={2} scrollable={true}>
		<SkillTree {data} />		
	</ContentPane>
</Shell>
