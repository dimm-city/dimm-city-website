<script>
	import './skill-trees.css';
	import { onMount, onDestroy } from 'svelte';
	import panzoom from 'panzoom';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { marked } from 'marked';

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
			initialZoom: 0.75,
			smoothScroll: true,
			bounds: true,
			boundsPadding: 0.85,
			onTouch: function (e) {
				// `e` - is current touch event.

				return false; // tells the library to not preventDefault.
			}
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
	function selectSkill(e, skill) {
		e.preventDefault();
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
	<ContentPane padding={0} scrollable={true}>
		<style id="page-style"></style>
		<div bind:this={canvas} class="skill-tree-container {data.attributes.slug}">
			{#if skills?.length > 0}
				{#each skills as skill, s (skill.id)}
					<button
						on:click={(e) => selectSkill(e, skill)}
						class="skill-cell {skill.attributes.slug}"
						data-skill-index={skill.id}
						data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both"
					>
						<div class="skill-cell-inner {skill.id ? 'unlocked' : 'locked'}">
							<h1 class="skill-button">{skill.attributes.name}</h1>

							<p>{@html marked.parse(skill?.attributes.shortDescription ?? '')}</p>
						</div>
					</button>
				{/each}
			{/if}
		</div>
	</ContentPane>
	<div class="details-panel" data-augmented-ui="tl-clip tr-clip br-clip bl-clip both">
		<div class="content">
			{#if selectedSkill}
				<h1><i class="bi bi-icon-name"></i> {selectedSkill.attributes.name}</h1>
				<p>{@html marked.parse(selectedSkill?.attributes.description ?? '')}</p>
				<div class="toolbar">
					<button on:click={() => (selectedSkill = null)}>Close</button>
				</div>
			{:else}
				<h1><i class="bi bi-icon-name"></i> Default Skill Tree Information</h1>
				<p>Default description...</p>
			{/if}
		</div>
	</div>
	<div class="bottom-toolbar">
		<div class="left-group">
			<button>Button 1</button>
			<button>Button 2</button>
		</div>
		<div class="right-group">
			<button>Button 3</button>
			<button>Button 4</button>
		</div>
	</div>
</div>

<style>
	:root {
		--skill-tree-bg-image: url('/assets/imgs/landing-bg.png');

		--skill-cell-bg-color: var(--dark);
		--skill-cell-border-color: var(--light);
	}
	.skill-tree-page {
		--content-panel-aspect-ratio: auto;
		position: relative;
		display: grid;
		grid-template-columns: 1fr min-content;
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
		grid-template-columns: repeat(5background-color, 1fr);
		grid-template-rows: repeat(5, 1fr);
		background-image: var(--skill-tree-bg-image);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;

		/* border: thin var(--fourth-accent) solid; */
	}
	.details-panel {
		position: absolute;
		right: 0;
		top: 1rem;
		bottom: 1rem;
		z-index: 1000;
		width: 0;

		display: flex;
		flex-direction: column;
		overflow-y: auto;

		max-height: 100%;
		visibility: collapse;

		background-color: var(--secondary-accent);
		color: var(--light);
		/* transition: width 0.1s ease-in-out, padding 0.1s ease-in-out, visibility 0.2s ease-in-out 0.2s; */

		--aug-inlay-bg: var(--dark);
		--aug-border-bg: var(--fourth-accent);
		padding: 1rem;
	}
	.details-panel h1 {
		text-align: center;
		color: var(--fourth-accent);
	}
	.details-panel.shown {
		visibility: visible;
		opacity: 1;
		width: 30ch;
		transition: width 0.2s ease-in-out, visibility 0.2s ease-in-out 0s, opacity 0.1s ease-in-out;
		transition-delay: 0s;
	}
	.details-panel.hidden {
		visibility: collapse;
		opacity: 0;
		width: 3ch;
		transition: width 0.2s ease-in-out, visibility 0.2s ease-in-out 0.3s, opacity 0.3s ease-in-out;
	}
	.details-panel .content {
		display: grid;
		min-height: 100%;
		grid-template-rows: min-content 1fr min-content;
		overflow: auto;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		transition-delay: 0.3s;
	}
	.details-panel.shown .content {
		opacity: 1;
	}

	.skill-cell {
		position: relative;
		width: 20ch;
		border: 1px solid var(--skill-cell-border-color);
		background-color: var(--skill-cell-bg-color);
		--aug-border-bg: var(--skill-cell-border-color);
		transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
		height: min-content;
		padding-bottom: 0.5rem;
		--aug-border-all: 1px;
		--aug-tr1: 7px;
		text-align: center;
		cursor: pointer;
		margin: 0;
		padding: 0;
		display: block;
	}

	.skill-cell.selected {
		--aug-border-all: 2px;
		--aug-tr1: 0px;
		--skill-cell-bg-color: var(--fourth-accent);
		--skill-cell-border-color: var(--secondary-accent);
		color: var(--dark);
		box-shadow: inset 3px -1px 20px 7px var(--skill-cell-border-color);
	}
	.skill-cell h1 {
		width: 100%;
		padding: 0.5rem 1rem;
		background-color: rgba(17, 17, 17, 0.75);
		border: 0;
		color: var(--third-accent);
		font-size: 1rem;
		font-family: var(--main-font-family);
		border: 1px var(--third-accent) solid;
		margin: 0;
	}
	.skill-cell p {
		padding-inline: 0.5rem;
	}
	.skill-cell.unlocked {
		--skill-cell-bg-color: var(--secondary-accent);
		--skill-cell-border-color: var(--fourth-accent);
		color: var(--dark);

		box-sizing: border-box;

		/*add glowing effect around unlocked cells*/
		box-shadow: inset 3px -1px 20px 7px var(--skill-cell-border-color);

		transition: box-shadow 0.3s ease-in-out;
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

	@media (max-width: 767px){
		.skill-tree-page .content-container {
			--content-panel-aspect-ratio: 9/16;
			
			/* aspect-ratio: 3/4; */
		}
	}
</style>
