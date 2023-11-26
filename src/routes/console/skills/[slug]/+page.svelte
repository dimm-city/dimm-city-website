<script>
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import ModalSideBar from '$lib/Shared/Shell/ModalSideBar.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { marked } from 'marked';
	import { openModal, closeAllModals } from 'svelte-modals';
	/**
	 * @type {DC.SkillTree}
	 */
	export let data;

	/**
	 * @type {DC.Ability | null}
	 */
	let selectedSkill;

	/**
	 * @param {DC.Ability} ability
	 */
	function viewAbility(ability) {
		closeAllModals();
		selectedSkill = ability;
		// @ts-ignore
		openModal(modal, { data: ability });
	}
	function closeAbility() {
		selectedSkill = null;
	}
	/**
	 * @type {ModalSideBar | null}
	 */
	let modal;

	let maxColumns = 1;
	$: if (data.attributes.abilities.data?.length > 0) {
		maxColumns = data.attributes.abilities.data
			.map((a) => a.attributes.module)
			.reduce((a, b) => Math.max(a, b));
	}
	
</script>

<Shell title={data?.attributes?.name} titleUrl="/console/skills">
	<ContentPane scrollable={true}>
		<div
			class="abilities-list"
			class:selected={selectedSkill}
			style="grid-template-columns: repeat({maxColumns}, 1fr);"
		>
			{#each data.attributes.abilities.data.sort((a, b) => a.attributes.level - b.attributes.level) as skill}
				{@const isSelected = selectedSkill?.id === skill.id}

				<div class="ability" class:selected={isSelected}>
					<MenuItem on:click={() => viewAbility(skill)} selected={isSelected}>
						<div class="ability-item">
							<h4><i class="" />{skill.attributes.name}</h4>
							<div>
								{@html marked.parse(skill?.attributes.shortDescription ?? '')}
							</div>
							<div class="ability-footer">
								<div>
									Level: {skill?.attributes.level}
								</div>
								<div>
									Module: {skill?.attributes.module}
								</div>
							</div>
						</div>
					</MenuItem>
				</div>
			{/each}
		</div>
	</ContentPane>
	<ModalSideBar bind:this={modal} on:dismiss={closeAbility} isOpen={selectedSkill != null}>
		{#if selectedSkill?.attributes}
			<div class="ability-header">
				<h2>{selectedSkill?.attributes.name}</h2>
				<div>AP: {selectedSkill?.attributes.ap}</div>
			</div>

			<hr />
			<div class="ability-description">
				{@html marked.parse(selectedSkill?.attributes?.description ?? '')}
			</div>
		{:else}
			<span>Not found</span>
		{/if}
	</ModalSideBar>
</Shell>

<style>
	:root {
		--dc-sidebar-width: 400px;
		--dc-sidebar-height: 90%;
		--dc-menu-item-selected-color: var(--fourth-accent);
		--dc-menu-item-selected-drop-shadow-color: var(--fourth-accent);
	}
	.abilities-list {
		--dc-menu-item-aspect-ratio: auto;
		--dc-menu-item-height: 100%;
		--dc-menu-item-width: 100%;
		margin-inline: auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--dc-menu-item-width), 1fr));
		gap: 1.5rem;
		height: min-content;
	}
	.ability-item {
		display: grid;
		min-height: 100%;
		width: 100%;
		grid-template-rows: min-content 1fr min-content;
	}
	.ability-item h4 {
		margin-block: 0;
	}
	.ability-footer {
		border-top: 1px solid var(--fourth-accent);
		padding-top: 0.25rem;
		display: flex;
		justify-content: space-between;
	}
	:global(.ability-description strong) {
		color: var(--pink);
	}
	:global(.ability-description ul) {
		padding-left: 0;
	}

	@media (max-width: 800px) {
		.abilities-list {
			grid-template-columns: 1fr !important;
		}
	}
</style>
