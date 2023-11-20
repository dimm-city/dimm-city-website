<script>
	import Article from '$lib/Shared/Components/Article.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { marked } from 'marked';
	/**
	 * @type {DC.Specialty}
	 */
	export let data;
</script>

<Shell title={data.attributes.name} titleUrl="/console/specialties">
	<ContentPane padding={2} scrollable={true}>
		<Article model={data} imageAug="tl-clip tr-clip-y br-clip bl-clip-y">
			{@html marked.parse(data?.attributes?.description || '')}
			<div class="skill-trees">
				<h2>Skill Trees</h2>

				<div class="skill-trees-list">
					{#each data.attributes.skillTrees.data as skillTree}
						<MenuItem title={skillTree.attributes.name} url="/console/skills/{skillTree.attributes.slug}">
							<h4>{skillTree.attributes.name}</h4>
							{@html marked.parse(skillTree.attributes.shortDescription ?? '')}
						</MenuItem>
					{/each}
				</div>
			</div>
		</Article>
	</ContentPane>
</Shell>

<style>
	.skill-trees {
		margin-block: auto;
	}
	.skill-trees h2 {
		color: var(--secondary-accent);
	}
	.skill-trees-list {
		--dc-menu-item-height: min-content;
		--dc-menu-item-aspect-ratio: auto;
		--dc-menu-item-width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 1rem;
	}
	.skill-trees-list h4 {
		margin-block: 0;
		color: var(--fourth-accent);
	}

	@media (max-width: 768px) {
		.skill-trees-list {
			grid-template-columns: 1fr;
		}
	}
</style>
