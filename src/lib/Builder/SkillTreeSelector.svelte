<script>
	import { onMount } from 'svelte';
	import { StrapiClient } from '$lib/Shared/StrapiClient';
	import { config } from '$lib/Shared/config';
	import { jwt } from '$lib/Shared/Stores/UserStore';

	/**
	 * @type {DC.Character}
	 */
	export let character;

	/**
	 * @type {DC.SkillTree}
	 */
	 export let selectedSkillTree;

	const client = new StrapiClient(config.apiBaseUrl, $jwt);

	/**
	 * @type {DC.SkillTree[]}
	 */
	export let skillTrees = [];

	onMount(async () => {
		const response = await client.search('dimm-city/skill-trees', {
			filters: {
				specialty: character.attributes.specialties.data.map((s) => s.id)
			},
			populate: '*'
		});
		if (response.data?.length > 0) {
			skillTrees = [...response.data];
		}
	});

		/**
	 * @param {string} slug
	 */
	export async function loadSkillTree(slug) {
		console.log('loadSkillTree', slug);
		const data = await client.loadBySlug('dimm-city/skill-trees', slug, {
			filters: {
				slug: slug
			},
			populate: {
				mainImage: true,
				abilities: true,
				specialties: true
			}
		});

		selectedSkillTree = {
			...data
		};

		//e.target?.scrollIntoView({ behavior: 'smooth' });
	}

	/**
	 * @param {string} slug
	 */
	function selectSkillTree(slug) {
		loadSkillTree(slug);
	}
</script>

<div>
	<h1>Select a Skill Tree</h1>
	<ul>
		{#each skillTrees as skillTree}
			<li on:click={() => selectSkillTree(skillTree.attributes.slug)}>
				{skillTree.attributes.name}
			</li>
		{/each}
	</ul>
</div>