<script>
	import './skill-trees.css';
	import { onMount, onDestroy } from 'svelte';
	import panzoom from 'panzoom';

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
		panzoomInstance = panzoom(canvas);
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

	/** @type DC.Ability|null */
	let selectedSkill;

	/**
	 * @param {DC.Ability | null} skill
	 */
	function selectSkill(skill) {
		selectedSkill = skill;
		console.log(selectedSkill);
		// Highlight children logic...

		//remove 'unlocked' class from all elements
		const skillCells = document.querySelectorAll('.skill-cell');
		skillCells.forEach((cell) => {
			cell.classList.remove('unlocked', 'selected');
		});
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

	/**
	 * @param {any} parent
	 */
	function unlockChildren(parent) {
		// Unlocking children logic...
	}
</script>

<div>
	<style id="page-style"></style>

	<div bind:this={canvas} class="skill-tree-container {data.attributes.slug}">
		{#if selectedSkill}<div class="details-panel">
				<p>{selectedSkill.attributes.description}</p>
			</div>
		{/if}
		{#if skills?.length > 0}
			{#each skills as skill, s (skill.id)}
				<div
					class="skill-cell {skill.attributes.slug}"
					data-skill-index={skill.id}
					data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both"
				>
					<button on:click={() => selectSkill(skill)}>{skill.attributes.name}</button>
				</div>
			{/each}
		{/if}
	</div>
	{#if selectedSkill}
		<!-- Modal for displaying skill details -->
		<div class="modal">
			<h2>{selectedSkill.attributes.name}</h2>
			<p>{selectedSkill.attributes.description}</p>
			<!-- Close button -->
			<button on:click={() => (selectedSkill = null)}>Close</button>
		</div>
	{/if}
</div>

<style>
	:root {
		--skill-tree-bg-image: url('/assets/imgs/landing-bg.png');
		--skill-cell-bg-color: var(--secondary-accent-muted);
		--skill-cell-border-color: var(--secondary-accent);
	}
	.skill-tree-container {
		width: 90vw;
		height: 90vh;
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
	.details-panel {
		position: absolute;
		top: -250px;
		width: 50ch;
		height: 250px;
		padding: 1rem;
		color: var(--secondary-accent);
		background-color: var(--fourth-accent);
	}
	.skill-cell {
		width: 15ch;
		border: 1px solid var(--skill-cell-border-color);
		height: 100%;
		background-color: var(--skill-cell-bg-color);
		transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
	}
	.skill-cell.selected {
		--skill-cell-bg-color: var(--fourth-accent);
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
