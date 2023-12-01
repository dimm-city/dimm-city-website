<script>
	import SkillTree from './SkillTree.svelte';
	import DetailsPanel from './DetailsPanel.svelte';

	import { onMount } from 'svelte';
	import { StrapiClient } from '$lib/Shared/StrapiClient';
	import { config } from '$lib/Shared/config';
	import { jwt } from '$lib/Shared/Stores/UserStore';
	import { writable } from 'svelte/store';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';

	const client = new StrapiClient(config.apiBaseUrl, $jwt);
	/**
	 * @type { DC.SkillTree[]}
	 */
	let skillTrees = [];

	/**
	 * @type { import('svelte/store').Writable<DC.SkillTree>}
	 */
	let selectedSkillTree = writable();

	/**
	 * @type {DC.Character}
	 */
	export let character;

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

		$selectedSkillTree = {
			...data
		};
	}
</script>

<ContentPane scrollable={false}>
	<div class="section-container">
		{#if $selectedSkillTree}
			<SkillTree selectedSkillTree={$selectedSkillTree} />
			<DetailsPanel side="left">
				<div class="specialty-details">
					<h1><i class="bi bi-icon-name" />{$selectedSkillTree.attributes.name}</h1>
					<div>
						<h3>
							<i class="bi bi-icon-type" />Specialty: {$selectedSkillTree.attributes.specialty?.data
								?.attributes.name}
						</h3>
						<h4>Additional Skill Trees</h4>
						{#if skillTrees?.length > 0}
							{#each skillTrees as tree}
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
					{#each skillTrees as skillTree}
						<li>
							<button
								data-augmented-ui
								class="small-menu-item"
								on:click={() => loadSkillTree(skillTree.attributes.slug)}
							>
								{skillTree.attributes.name}
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
