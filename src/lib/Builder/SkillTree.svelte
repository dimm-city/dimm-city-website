<script>
	import DetailsPanel from './DetailsPanel.svelte';
	import SkillTreeCard from './SkillTreeCard.svelte';
	import './skill-trees.css';
	import { onMount, onDestroy } from 'svelte';
	import panzoom from 'panzoom';
	import { marked } from 'marked';
	import { writable } from 'svelte/store';
	import {
		selectedSkillTree,	
		acquireSkill,
		availableSkills,
		removeSkill
	} from './BuilderStore';

	/**
	 * @type {import("panzoom").PanZoom}
	 */
	let panzoomInstance;

	/**
	 * @type {HTMLElement | SVGElement | null}
	 */
	let canvas;

	/**
	 * @type {DC.Ability | null}
	 */
	let _selectedSkill;

	let advancedMode = false;
	/**
	 * @type {import('svelte/store').Writable<boolean>}
	 */
	let showDetails = writable(false);

	let maxRows = 5;
	let maxColumns = 5;

	/** @type {string|undefined }*/
	let pageImage = '';

	onMount(() => {
		console.log('mounting');
		if (canvas === null) return;
		panzoomInstance = panzoom(canvas, {
			maxZoom: 1.2,
			minZoom: 0.75,
			zoomSpeed: 0.1,
			initialZoom: 0.75,
			smoothScroll: false,
			bounds: true,
			boundsPadding: 0.8,
			beforeWheel: function (e) {
				// Prevent the browser from scrolling.
				e.preventDefault();

				// allow wheel-zoom only if altKey is down. Otherwise - ignore
				const shouldIgnore = !e.altKey;
				// panzoomInstance.smoothZoomAbs(0, 0, 1 + e.deltaY * 0.001);
				// console.log('zoomie');
				return false;
			},
			onTouch: function (e) {
				// `e` - is current touch event.

				return true; // tells the library to not preventDefault.
			}
		});
	});

	onDestroy(() => {
		panzoomInstance.dispose();
	});

	function initData() {
		$selectedSkillTree.attributes.abilities?.data?.forEach((ability) => {
			if (ability.attributes.level == 1) {
				ability.unlocked = true;
			}
		});

		if ($selectedSkillTree.attributes.abilities?.data?.length > 0) {
			maxRows = $selectedSkillTree.attributes.abilities.data
				.map((a) => a.attributes.level)
				.reduce((a, b) => Math.max(a, b));
			maxColumns = $selectedSkillTree.attributes.abilities.data
				.map((a) => a.attributes.module)
				.reduce((a, b) => Math.max(a, b));
		}

		pageImage = $selectedSkillTree.attributes.mainImage?.data?.attributes.url;

		if (!pageImage)
			pageImage =
				$selectedSkillTree.attributes.specialty?.data?.attributes.mainImage?.data?.attributes.url;

		if (!pageImage) pageImage = '/assets/missing-image.png';

		availableSkills.set([...$selectedSkillTree.attributes.abilities?.data]);
	}

	function updateMatrix() {
		if (advancedMode) {
			advancedUpdate();
		} else {
			simpleUpdate();
		}
	}

	function simpleUpdate() {
		availableSkills.update((values) => {
			values.forEach((s) => {
				//s.selected = s === skill;
				s.unlocked = s.attributes.level == 1;
			});

			// Get the max level of a skill that has been acquired
			let maxLevel =
				Math.max(...values.filter((s) => s.acquired).map((s) => s.attributes.level)) + 1;

			values
				.filter((s) => s.attributes.level <= maxLevel)
				.forEach((s) => {
					s.unlocked = true;
				});
			return values;
		});
	}

	function advancedUpdate() {
		throw new Error('Function not implemented.');
	}

	/**
	 * @param {DC.Ability | null} skill
	 * @param {MouseEvent} e
	 */
	function selectSkill(e, skill) {
		e.preventDefault();
		if (skill == null) {
			_selectedSkill = null;
		} else {
			skill.selected = true;
			_selectedSkill = { ...skill };
		}
		availableSkills.update((values) => {
			values.forEach((s) => {
				s.selected = s === skill;
			});
			return values;
		});

		updateMatrix();

		$showDetails = skill != null;
		// const skillElement = document.querySelector('[data-skill-index="' + skill.id + '"]');
		// if (skillElement) {
		// 	const rect = skillElement.getBoundingClientRect();
		// 	const x = rect.left + window.scrollX;
		// 	const y = rect.top + window.scrollY;
		// 	panzoomInstance.smoothZoomAbs(x, y, 1);
		// }
	}

	/**
	 * @param {DC.Ability | null} skill
	 */
	async function toggleSkill(skill) {
		console.log('toggleSkill', skill);
		
		if (!skill) return;

		if (!skill.acquired) await acquireSkill(skill);
		else await removeSkill(skill);

		updateMatrix();
	}

	$: if ($selectedSkillTree?.id > 0) {
		initData();
	}
</script>

<div class="skill-tree-page" style="--skill-tree-bg-image: url({pageImage});">
	<style id="page-style"></style>
	<div class="viewer-panel">
		<div bind:this={canvas} class="skill-tree-container {$selectedSkillTree?.attributes?.slug}">
			<div
				class="skill-matrix"
				style="grid-template-columns: repeat({maxColumns}, 1fr); grid-template-columns: repeat({maxRows}, 1fr);"
			>
				{#if $availableSkills?.length > 0}
					{#each $availableSkills as skill (skill.id)}
						<div
							class="matrix-cell"
							style="grid-row: {skill.attributes.level}; grid-column: {skill.attributes.module};"
						>
							<SkillTreeCard
								selected={skill.id == _selectedSkill?.id}
								acquired={skill.acquired}
								unlocked={skill.unlocked}
								data={skill}
								on:click={(e) => selectSkill(e, skill)}
							/>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
<DetailsPanel bind:showDetails={$showDetails}>
	{#if _selectedSkill}
		<h1>{_selectedSkill.attributes.name}</h1>
		<p>{@html marked.parse(_selectedSkill?.attributes.description ?? '')}</p>
		<div class="toolbar">
			<button on:click={() => toggleSkill(_selectedSkill)}> Toggle Skill </button>
		</div>
	{:else}
		<h1>No Skill Selected</h1>
	{/if}
</DetailsPanel>

<style>
	:root {
		--skill-tree-bg-image: none;
		/* url('/assets/imgs/landing-bg.png'); */
	}
	.section-container {
		padding-top: 1.5rem;
		padding-bottom: 3rem;
		padding-inline: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		gap: 3rem;
		overflow-y: scroll;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-inlay-bg: var(--opaque-dark);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		box-shadow: inset 0 0 5rem var(--secondary-accent-muted);
	}
	.small-menu-item {
		padding-block: 0.25em;
	}
	.skill-tree-page {
		--content-panel-aspect-ratio: auto;
		position: relative;
		display: grid;
		grid-template-rows: 1fr min-content;
		max-height: 87dvh;
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

		background-image: var(--skill-tree-bg-image);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
	.skill-matrix {
		display: grid;
		gap: 2em 4em;
		height: 100%;
		width: 100%;
		margin: auto;

		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
	}

	.matrix-cell {
		display: flex;
		justify-content: center;
		align-items: center;
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
