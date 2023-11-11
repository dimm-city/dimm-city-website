<script>
	import './skill-trees.css';
	import { onMount, onDestroy } from 'svelte';
	import panzoom from 'panzoom';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';

	/**
	 * @type {import("panzoom").PanZoom}
	 */
	let panzoomInstance;

	/**
	 * @type {HTMLElement | SVGElement | null}
	 */
	let canvas;

	onMount(() => {
		if (canvas === null) return;
		panzoomInstance = panzoom(canvas, {
			maxZoom: 1,
			minZoom: 0.75,
			zoomSpeed: 0.1,
			initialZoom: 0.8,
			smoothScroll: true
		});
		skills = data.attributes.abilities.data;
		console.log(skills, data);
	});

	onDestroy(() => {
		panzoomInstance.dispose();
	});

	/** @type DC.SkillTree */
	export let data;

	/**
	 * @type {DC.Ability[]}
	 */
	let skills = [];

	/** @type DC.Ability | null */
	let selectedSkill;

	/**
	 * @param {DC.Ability | null} skill
	 */
	function selectSkill(skill) {
		//remove 'unlocked' class from all elements
		const skillCells = document.querySelectorAll('.skill-cell');
		skillCells.forEach((cell) => {
			cell.classList.remove('unlocked', 'selected');
		});
		if (selectedSkill?.id == skill?.id) {
			selectedSkill = null;
			return;
		} else {
			selectedSkill = skill;
			console.log(selectedSkill);
			// Highlight children logic...

			//add 'selected' class to the selected element
			if (selectedSkill) {
				const skillCell = document.querySelector(
					`.skill-cell[data-skill-index="${selectedSkill.id}"]`
				);
				if (skillCell) {
					skillCell.classList.add('selected');
				}
			}

			//add unlocked class to children
			if (selectedSkill) {
				const children = selectedSkill.attributes.children?.data ?? [];
				children.forEach((child) => {
					const skillCell = document.querySelector(`.skill-cell[data-skill-index="${child.id}"]`);
					if (skillCell) {
						skillCell.classList.add('unlocked');
					}
				});
			}
		}
	}

	/**
	 * @param {any} parent
	 */
	function unlockChildren(parent) {
		// Unlocking children logic...
	}
</script>

<div class="skill-tree-page">
	<ContentPane padding={0} scrollable={false}>
		<style id="page-style"></style>
		<div bind:this={canvas} class="skill-tree-container {data.attributes.slug}">
			{#if skills?.length > 0}
				{#each skills as skill, s (skill.id)}
					<div
						class="skill-cell {skill.attributes.slug}"
						data-skill-index={skill.id}
						data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both"
					>
						<div class="skill-cell-inner {skill.id ? 'unlocked' : 'locked'}">
							<button on:click={() => selectSkill(skill)}>{skill.attributes.name}</button>

							{#if selectedSkill == skill}
								<p>{selectedSkill.attributes.shortDescription}</p>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</ContentPane>
	<div class="bottom-panel" class:shown={selectedSkill}>
		{#if selectedSkill}
			<p>{selectedSkill.attributes.description}</p>
			<div class="toolbar">
				<button on:click={() => (selectedSkill = null)}>Close</button>
			</div>
		{/if}
	</div>
</div>

<style>
	:root {
		--skill-tree-bg-image: url('/assets/imgs/landing-bg.png');
		--skill-cell-bg-color: var(--secondary-accent-muted);
		--skill-cell-border-color: var(--secondary-accent);
	}
	.skill-tree-page {
		display: grid;
		grid-template-rows: 1fr min-content;
		max-height: 92dvh;
		row-gap: 1rem;
	}
	.skill-tree-container {
		width: 1920px;
		height: 1080px;
		padding: 1em;
		position: relative;
		display: grid;
		gap: 2em;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		background-image: var(--skill-tree-bg-image);
		background-size: cover;
		background-repeat: no-repeat;

		/* border: thin var(--fourth-accent) solid; */
	}
	.bottom-panel {
		height: 0;
		z-index: 1000;
		background-color: var(--secondary-accent);
		color: var(--light);
		transition: height 0.3s ease-in-out, padding-bottom 0.3s ease-in-out,
			margin-top 0.3s ease-in-out;
		padding-bottom: 0rem;
		padding-inline: 1rem;
	}
	.bottom-panel.shown {
		height: 250px;
		padding-bottom: 5rem;
	}

	.skill-cell {
		position: relative;
		width: 15ch;
		border: 1px solid var(--skill-cell-border-color);
		/* height: 100%; */
		background-color: var(--skill-cell-bg-color);
		transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
		height: min-content;
	}
	.skill-cell.selected {
		--skill-cell-bg-color: var(--fourth-accent);
	}
	.skill-cell p {
		padding-inline: 0.5rem;
	}
	.skill-cell.unlocked {
		--skill-cell-bg-color: var(--third-accent);
		/*add glowing effect around unlocked cells*/
		box-shadow: 0 0 20px var(--third-accent);
	}
	/* Futuristic/Cyberpunk styling */
	.skill-tree {
		background-color: transparent;
		color: var(--third-accent);
		/* #0ff; */
		border: 2px solid var(--secondary-accent);
		height: 100%;
		width: 100%;
	}
	.skill {
		border: 1px solid var(--third-accent);
		border-radius: 50%;
	}
	.line {
		stroke: #0ff;
		stroke-width: 2;
	}
	.unlocked {
		fill: #0ff;
	}
	.locked {
		fill: #555;
	}
</style>
