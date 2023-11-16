<script>
	import SkillTreeCard from './SkillTreeCard.svelte';

	import './skill-trees.css';
	import { onMount, onDestroy } from 'svelte';
	import panzoom from 'panzoom';
	import { marked } from 'marked';
	import { writable } from 'svelte/store';

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
			maxZoom: 1.2,
			minZoom: 0.75,
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

		// Add the ability level
		data.attributes.abilities.data.forEach((ability) => {
			if (ability.attributes.level == 1) {
				ability.unlocked = true;
			}
		});

		skills.set(data.attributes.abilities.data);
	});

	onDestroy(() => {
		panzoomInstance.dispose();
	});

	/** @type DC.SkillTree */
	export let data;

	/**
	 * @type {import('svelte/store').Writable<DC.Ability[]>}
	 */
	let skills = writable([]);

	/** @type DC.Ability | null */
	let selectedSkill;

	let advancedMode = false;
	let showDetails = false;

	/**
	 * @param {DC.Ability[]} values
	 * @param {DC.Ability} skill
	 */
	function updateMatrix(values, skill) {
		if (advancedMode) {
			advancedUpdate(values, skill);
		} else {
			simpleUpdate(values, skill);
		}
	}

	/**
	 * Update the skill matrix
	 * @param {DC.Ability[]} values
	 * @param {DC.Ability} skill
	 */
	function simpleUpdate(values, skill) {
		values.forEach((s) => {
			s.selected = s === skill;
			s.unlocked = s.attributes.level == 1;
		});

		// Get the max level of a skill that has been acquired
		let maxLevel = Math.max(...values.filter((s) => s.acquired).map((s) => s.attributes.level)) + 1;

		values
			.filter((s) => s.attributes.level <= maxLevel)
			.forEach((s) => {
				s.unlocked = true;
			});
	}
	/**
	 * @param {DC.Ability[]} values
	 * @param {DC.Ability} skill
	 */
	function advancedUpdate(values, skill) {
		throw new Error('Function not implemented.');
	}

	/**
	 * @param {DC.Ability | null} skill
	 * @param {MouseEvent} e
	 */
	function selectSkill(e, skill) {
		e.preventDefault();
		if (!skill) return;

		selectedSkill = skill;
		skills.update((values) => {
			if (skill == null) {
				values.forEach((s) => {
					s.selected = false;
				});
			} else {
				updateMatrix(values, skill);
			}

			return values;
		});

		const skillElement = document.querySelector('[data-skill-index="' + skill.id + '"]');
		if (skillElement) {
			const rect = skillElement.getBoundingClientRect();
			const x = rect.left + window.scrollX;
			const y = rect.top + window.scrollY;
			panzoomInstance.smoothZoomAbs(x, y, 1);
		}		
	}

	/**
	 * @param {DC.Ability | null} skill
	 */
	function toggleSkill(skill) {
		if (skill == null) return;

		skills.update((values) => {
			const value = values.find((s) => s.id === skill.id);
			if (value) {
				value.acquired = !value.acquired;
				updateMatrix(values, skill);
			}
			return values;
		});
	}
</script>

<div class="skill-tree-page">
	<style id="page-style"></style>
	<div
		class="viewer-panel"
		data-augmented-ui="bl-clip-inset br-clip-inset tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip both"
	>
		<div bind:this={canvas} class="skill-tree-container {data.attributes.slug}">
			{#if $skills?.length > 0}
				{#each $skills as skill, s (skill.id)}
					<div
						class="matrix-cell"
						style="grid-row: {skill.attributes.level}; grid-column: {skill.attributes.module};"
					>
						<SkillTreeCard data={skill} on:click={(e) => selectSkill(e, skill)} />
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="bottom-toolbar">
		<div class="left-group">
			<button on:click={() => toggleSkill(selectedSkill)}>Toggle Skill</button>
			<button>Button 1</button>
		</div>
		<div class="right-group">
			<button>Button 2</button>
			<button on:click={() => (showDetails = !showDetails)}>Toggle Details</button>
		</div>
	</div>
</div>

<div
	class="details-panel"
	class:shown={showDetails}
	class:hidden={!showDetails}
	data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
>
	<div class="content">
		{#if selectedSkill}
			<h1>{selectedSkill.attributes.name}</h1>
			<p>{@html marked.parse(selectedSkill?.attributes.description ?? '')}</p>
			<div class="toolbar">
				<button on:click={() => (showDetails = false)}>Close</button>
			</div>
		{:else}
			<h1><i class="bi bi-icon-name" /> Default Skill Tree Information</h1>
			<p>Default description...</p>
		{/if}
	</div>
	<button class="text-button" on:click={() => (showDetails = !showDetails)}>
		<i class="btn bi bi-chevron-left" /></button
	>
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
	}
	.matrix-cell {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.details-panel {
		position: absolute;
		right: -2ch;
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
		color: var(--light);

		--aug-inlay-bg: var(--dark);
		--aug-border-bg: var(--fourth-accent);
		padding: 1rem;
	}
	.details-panel button {
		position: absolute;
		top: 5px;
		right: 25px;
		transition: width 0.2s ease-in-out, right 0.2s ease-in-out, rotate 0.2s ease-in-out 0s,
			left 0.1s ease-in-out;
	}
	.details-panel button > i {
		rotate: 0deg;
		transition: rotate 0.2s ease-in-out 0s;
	}
	.details-panel.shown button {
		right: 5px;
	}
	.details-panel.shown > button i {
		right: 5px;
		rotate: 180deg;
		transition: rotate 0.2s ease-in-out 0s;
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
