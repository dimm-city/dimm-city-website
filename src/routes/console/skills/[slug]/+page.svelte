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
</script>

<Shell title={data?.attributes?.name} titleUrl="/console/skills">
	<ContentPane scrollable={true}>
		<div class="abilities-list" class:selected={selectedSkill}>
			{#each data.attributes.abilities.data.sort((a, b) => a.attributes.level - b.attributes.level) as skill}
				{@const isSelected = selectedSkill?.id === skill.id}

				<div class="ability" class:selected={isSelected}>
					<MenuItem on:click={() => viewAbility(skill)} selected={isSelected}>
						<h6><i class="" />{skill.attributes.name}</h6>
						<div>
							{@html marked.parse(skill?.attributes.shortDescription ?? '')}
						</div>
						<hr />
						<div>
							Level: {skill?.attributes.level}
						</div>
					</MenuItem>
				</div>
			{/each}
		</div>
		<ModalSideBar bind:this={modal} on:dismiss={closeAbility} isOpen={selectedSkill != null}>
			{#if selectedSkill?.attributes}
				<div class="ability-header">
					<div>{selectedSkill?.attributes.name}</div>
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
	</ContentPane>
</Shell>

<style>
	:root {
		--dc-sidebar-width: 400px;
		--dc-sidebar-height: 90%;
	}
	.abilities-list {
		
			--dc-menu-item-aspect-ratio: auto;
			--dc-menu-item-height: auto;
			--dc-menu-item-width: 100%;
		margin-inline: auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--dc-menu-item-width), 1fr));
		gap: 1.5rem;
		height: min-content;
	}

	:global(.ability-description strong) {
		color: var(--pink);
	}
	:global(.ability-description ul) {
		padding-left: 0;
	}

	@media (max-width: 800px) {
		.abilities-list {
			--dc-menu-item-aspect-ratio: auto;
			--dc-menu-item-height: auto;
			--dc-menu-item-width: 100%;
		}
	}
</style>
