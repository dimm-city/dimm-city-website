<script>
	import SkillTreeCard from './SkillTreeCard.svelte';

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
			minZoom: 0.65,
			zoomSpeed: 0.1,
			initialZoom: 0.75,
			smoothScroll: false,
			bounds: true,
			boundsPadding: 0.8,
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
	 * @param {MouseEvent} e
	 */
	function selectSkill(e, skill) {
		e.preventDefault();
		const skillCells = document.querySelectorAll('.skill-cell');
		skillCells.forEach((cell) => {
			cell.classList.remove('unlocked', 'selected');
		});
		skills.forEach((s) => {
			s.selected = false;
		});
		if (skill) {
			skill.selected = !skill.selected;
			const children = skill.attributes.children?.data ?? [];
			children.forEach((child) => {
				child.available = true;
				const skillCell = document.querySelector(`.skill-cell[data-skill-index="${child.id}"]`);
				if (skillCell) {
					skillCell.classList.add('unlocked');
				}
			});

			selectedSkill = skill;
			console.log(selectedSkill);
		} else {
			selectedSkill = null;
		}
		skills = [...skills];
	}

	/**
	 * @param {any} parent
	 */
	function gainSkill(parent) {
		// Unlocking children logic...
		parent.unlocked = true;
		parent.attributes.children.data.forEach((child) => {
			child.available = true;
		});
		parent.attributes.children.data = [...parent.attributes.children.data];
	}
</script>

<div class="skill-tree-page">
	<style id="page-style"></style>
	<div
		class="viewer-panel"
		data-augmented-ui="bl-clip-inset br-clip-inset tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip both"
	>
		<div bind:this={canvas} class="skill-tree-container {data.attributes.slug}">
			{#if skills?.length > 0}
				{#each skills as skill, s (skill.id)}
					<SkillTreeCard data={skill} on:click={(e) => selectSkill(e, skill)} />
				{/each}
			{/if}
		</div>
	</div>

	<div class="bottom-toolbar">
		<div class="left-group">
			<button>Button 1</button>
			<button>Button 2</button>
		</div>
		<div class="right-group">
			<button>View Details</button>
			<button on:click={() => gainSkill(selectedSkill)}>Gain Skill</button>
		</div>
	</div>
</div>

<div
	class="details-panel"
	class:shown={selectedSkill}
	class:hidden={!selectedSkill}
	data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
>
	<div class="content">
		{#if selectedSkill}
			<h1>{selectedSkill.attributes.name}</h1>
			<p>{@html marked.parse(selectedSkill?.attributes.description ?? '')}</p>
			<div class="toolbar">
				<button on:click={() => (selectedSkill = null)}>Close</button>
			</div>
		{:else}
			<h1><i class="bi bi-icon-name" /> Default Skill Tree Information</h1>
			<p>Default description...</p>
		{/if}
	</div>
</div>

<style>
	:root {
		--skill-tree-bg-image: none;
		/* url('/assets/imgs/landing-bg.png'); */
	}
	.skill-tree-page {
		--content-panel-aspect-ratio: auto;
		position: relative;
		display: grid;
		grid-template-rows: 1fr min-content;
		max-height: 92dvh;
		row-gap: 0.25rem;
	}
	.skill-tree-page > .viewer-panel {
		max-width: 92dvw;
		max-height: 100%;
		overflow: hidden;
		margin: auto;
		--aug-border: initial;
		--aug-border-all: var(--content-decoration-aug-size);
		--aug-border-bg: var(--content-decoration-aug-color);
		--aug-inlay-bg: black;
	}
	.skill-tree-container {
		width: 1920px;
		height: 1080px;
		padding: 1em;
		position: relative;
		display: grid;
		gap: 0.2em;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		background-image: var(--skill-tree-bg-image);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;

		/* border: thin var(--fourth-accent) solid; */
	}
	.details-panel {
		position: absolute;
		right: -3ch;
		top: 1rem;
		bottom: 1rem;
		z-index: 1000;
		width: 0;
		height: 80dvh;
		margin: auto;
		display: flex;
		flex-direction: column;
		overflow-y: auto;

		max-height: 100%;
		/* visibility: collapse;

		background-color: var(--secondary-accent); */
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
		/* visibility: visible; */
		opacity: 1;
		width: 30ch;
		right: 0ch;
		transition: width 0.2s ease-in-out, right 0.2s ease-in-out, visibility 0.2s ease-in-out 0s,
			opacity 0.1s ease-in-out;
		transition-delay: 0s;
	}
	.details-panel.hidden {
		/* visibility: collapse;
		opacity: 0; */
		width: 5ch;
		transition: width 0.2s ease-in-out, right 0.2s ease-in-out, visibility 0.2s ease-in-out 0.3s,
			opacity 0.3s ease-in-out;
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

	.bottom-toolbar {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}

	.left-group,
	.right-group {
		display: flex;
		gap: 1rem;
	}

	.bottom-toolbar button {
		white-space: nowrap;
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

	@media (max-width: 767px) {
		.skill-tree-page .content-container {
			--content-panel-aspect-ratio: 9/16;

			/* aspect-ratio: 3/4; */
		}
	}
</style>
