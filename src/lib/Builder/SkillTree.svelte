<script>
	import DetailsPanel from './DetailsPanel.svelte';

	import SkillTreeCard from './SkillTreeCard.svelte';

	import './skill-trees.css';
	import { onMount, onDestroy } from 'svelte';
	import panzoom from 'panzoom';
	import { marked } from 'marked';
	import { writable } from 'svelte/store';
	import { selectedSkillTree, selectedSkill } from './BuilderStore';

	/**
	 * @type {import("panzoom").PanZoom}
	 */
	let panzoomInstance;

	/**
	 * @type {HTMLElement | SVGElement | null}
	 */
	let canvas;

	/**
	 * @type {import('svelte/store').Writable<DC.Ability[]>}
	 */
	let skills = writable([]);

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

		skills.set([...$selectedSkillTree.attributes.abilities?.data]);
	}

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
		if (!skill?.id ) {
		//	$showDetails = false;
			return;
		}

		$selectedSkill = { ...skill }; // == $selectedSkill ? null : skill;
		skills.update((values) => {
			if ($selectedSkill == null) {
				values.forEach((s) => {
					s.selected = false;
				});
			} else {
				updateMatrix(values, skill);
			}

			return values;
		});

		$showDetails = true;
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
				{#if $skills?.length > 0}
					{#each $skills as skill (skill.id)}
						<div
							class="matrix-cell"
							style="grid-row: {skill.attributes.level}; grid-column: {skill.attributes.module};"
						>
							<SkillTreeCard
								data={skill}
								on:click={(e) => selectSkill(e, skill)}
								on:acquired={(e) => toggleSkill(e.detail)}
							/>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
<DetailsPanel bind:showDetails={$showDetails}>
	{#if $selectedSkill}
		<h1>{$selectedSkill.attributes.name}</h1>
		<p>{@html marked.parse($selectedSkill?.attributes.description ?? '')}</p>
		<div class="toolbar">
			<button on:click={() => toggleSkill($selectedSkill)}> Toggle Skill </button>
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
