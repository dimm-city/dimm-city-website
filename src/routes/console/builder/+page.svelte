<script>
	import DetailsPanel from '$lib/Builder/DetailsPanel.svelte';
	import SkillTree from '$lib/Builder/SkillTree.svelte';
	import Sheet from '$lib/Characters/Components/CharacterSheet/Sheet.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { jwt } from '$lib/Shared/Stores/UserStore';
	import { StrapiClient } from '$lib/Shared/StrapiClient';
	import { config } from '$lib/Shared/config';
	/**
	 * @type {any}
	 */
	export let data;

	let characterSlug = data.citizen ?? 'dcs1r1-29';
	let skillTreeSlug = data.skillTree;

	/** @type {DC.Character} */
	let character = data.citizenData;
	let skillTree = data.skillTreeData;
	let mode = data.mode ?? 'select';

	const client = new StrapiClient(config.apiBaseUrl, $jwt);

	async function loadCharacter() {
		character = await client.loadBySlug('dimm-city/characters', characterSlug, {
			filters: {
				tokenId: characterSlug
			},
			populate: {
				mainImage: true,
				originalLocation: true,
				currentLocation: true,
				specialties: {
					populate: {
						skillTrees: true
					}
				}
			}
		});

		mode = 'overview';
	}

	async function loadSkillTree(tree) {
		if (tree) skillTreeSlug = tree.attributes.slug;

		skillTree = await client.loadBySlug('dimm-city/skill-trees', skillTreeSlug);
		mode = 'skill-tree';
	}
</script>

<Shell title="Sporo Builder" titleUrl="/console/skills">
	{#if mode === 'skill-tree'}
		<SkillTree data={skillTree} />
		<!-- <DetailsPanel side="left">
			<div class="specialty-details">
				<h1><i class="bi bi-icon-name" />{skillTree.attributes.name}</h1>
				<div>
					<h3>
						<i class="bi bi-icon-type" />Specialty: {character.attributes.specialty?.data
							?.attributes.name}
					</h3>
					<h4>Additional Skill Trees</h4>
					{#if skillTree.attributes.specialty}
						{#each skillTree.attributes.specialty.data?.attributes.skillTrees?.data as tree}
							<a href={tree.attributes.slug}>
								<div data-augmented-ui class="small-menu-item">
									<h5><i class="bi bi-icon-type" />{tree.attributes.name}</h5>
								</div>
							</a>
						{/each}
					{/if}
				</div>
			</div>
		</DetailsPanel> -->
	{:else if mode === 'citizen'}
		<div>
			<Sheet bind:character isEditing={true} on:save />
		</div>
	{:else if mode === 'overview'}
		<div>
			<Sheet bind:character isEditing={false} on:save />
		</div>
	{:else}
		<ContentPane padding={3}>
			<div>
				<h1>Select your Sporo</h1>
				<button on:click={() => loadCharacter()}>Load an example</button>

				<strong><em>*Sign in to select your Sporo coming soon</em></strong>
			</div>
		</ContentPane>
	{/if}
	<DetailsPanel side="left">
		<div class="specialty-details">
			{#if character?.id > 0}
				<h1><i class="bi bi-icon-name" />{character.attributes.name}</h1>
				<div>
					<!-- <h3>
							<i class="bi bi-icon-type" />Specialty: {character.attributes.specialty?.data
								?.attributes.name}
						</h3> -->
					<h4>Available Skill Trees</h4>
					{#if character.attributes.specialties.data?.length > 0}
						{#each character.attributes.specialties.data as specialty}
							{#if specialty.attributes.skillTrees?.data.length > 0}
								{#each specialty.attributes.skillTrees?.data as tree}
									<a
										href="#skill-tree={tree?.attributes.slug}"
										on:click|preventDefault={() => loadSkillTree(tree)}
									>
										<div data-augmented-ui class="small-menu-item">
											<h5><i class="bi bi-icon-type" />{tree.attributes.name}</h5>
										</div>
									</a>
								{/each}
							{/if}
						{/each}
					{/if}
				</div>
				<button on:click={() => (mode = 'overview')}>Overview</button>
				<button on:click={() => (mode = 'citizen')}>Edit Character</button>
				<!-- <button on:click={() => (mode = 'skill-tree')}>Edit Skills</button> -->
				<button on:click={() => (mode = 'select')}>Select Character</button>
			{:else}
				<div>Please select a character</div>
			{/if}
		</div>
	</DetailsPanel>
</Shell>
