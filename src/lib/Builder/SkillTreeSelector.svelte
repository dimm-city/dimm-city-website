<script>
	import { onMount } from 'svelte';
	import { StrapiClient } from '$lib/Shared/StrapiClient';
	import { config } from '$lib/Shared/config';
	import { jwt } from '$lib/Shared/Stores/UserStore';

	const client = new StrapiClient(config.apiBaseUrl, $jwt);

	let skillTrees = [];

	onMount(async () => {
		const response = await client.get('skill-trees');
		if (response.data?.length > 0) {
			skillTrees = [...response.data];
		}
	});

	export let selectedSkillTree;

	function selectSkillTree(skillTree) {
		selectedSkillTree = skillTree;
	}
</script>

<div>
	<h1>Select a Skill Tree</h1>
	<ul>
		{#each skillTrees as skillTree}
			<li on:click={() => selectSkillTree(skillTree)}>
				{skillTree.attributes.name}
			</li>
		{/each}
	</ul>
</div>
