<script>
	import AbilityModal from '$lib/Abilities/AbilityModal.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import { marked } from 'marked';
	import { openModal } from 'svelte-modals';
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
		selectedSkill = ability;
		//openModal(AbilityModal, { data: ability });
	}
	function closeAbility(skill) {
		console.log('closing');
		if (selectedSkill === skill) {
			selectedSkill = { id: -1, attributes: { name: '' } };
		} else selectedSkill = skill;
		console.log(selectedSkill, skill, selectedSkill != null && selectedSkill.id === skill.id);
	}
</script>

<Shell title={data?.attributes?.name} titleUrl="/console/skills">
	<ContentPane scrollable={true}>
		<div class="abilities-list">
			{#each data.attributes.abilities.data as skill}
				{@const isSelected = selectedSkill?.id === skill.id}
				<!-- {@debug isSelected} -->

				<div class="ability" class:selected={isSelected} class:unselected={!isSelected}>
					<MenuItem on:click={() => viewAbility(skill)}>
						<h6><i class="" />{skill.attributes.name}</h6>
						{#if isSelected}
							<button on:click|stopPropagation={() => closeAbility(skill)}>close</button>
							<div>
								{@html marked.parse(selectedSkill?.attributes.description ?? '')}
							</div>
						{:else}
							<small>{skill.attributes.shortDescription}</small>
						{/if}
					</MenuItem>
				</div>
			{/each}
		</div>
	</ContentPane>
</Shell>

<style>
	.abilities-list {
		--dc-menu-item-aspect-ratio: 4/3;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
		position: relative;

		display: flex;
		flex-wrap: wrap;
	}
	.ability {
		transition: all 0.5s ease;
		--dc-menu-item-aspect-ratio: auto;
		--dc-menu-item-height: 250px;
		--dc-menu-item-width: 300px;
	}
	.ability.unselected {
		--dc-menu-item-height: 250px;
		--dc-menu-item-width: 300px;
		transition: all 0.5s ease-in-out;
	}
	.ability.selected {
		position: absolute;
		margin: auto;
		top: 0;
		height: 100%;
		background-color: black;
		z-index: 100;
		--dc-menu-item-height: 100%;
		--dc-menu-item-width: 100%;
		transition: all 0.5s ease-in-out;
	}
	/* @keyframes shrinkHeight {
		0% {
			position: absolute;
			margin: auto;
			top: 0;
			height: 100%;
			background-color: black;
			z-index: 100;
			opacity: 1;
		}
		80% {
			opacity: 0;
			height: 0px;
		}
		81% {
			
			position: relative;
		}
		100% {
			opacity: 1;
			height: 250px;
		}
	} */

</style>
