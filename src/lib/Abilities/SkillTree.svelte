<script>
	import DetailsPanel from './DetailsPanel.svelte';

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
		data.attributes.abilities.data.forEach((ability) => {
			if (ability.attributes.level == 1) {
				ability.unlocked = true;
			}
		});

		if (data.attributes.abilities.data?.length > 0) {
			maxRows = data.attributes.abilities.data
				.map((a) => a.attributes.level)
				.reduce((a, b) => Math.max(a, b));
			maxColumns = data.attributes.abilities.data
				.map((a) => a.attributes.module)
				.reduce((a, b) => Math.max(a, b));
		}
		pageImage = data.attributes.mainImage?.data?.attributes.url;
		if (!pageImage)
			pageImage = data.attributes.specialty.data?.attributes.mainImage.data.attributes.url;

		skills.set(data.attributes.abilities.data);
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
		if (!skill) {
			showDetails = false;
			return;
		}

		selectedSkill = skill == selectedSkill ? null : skill;
		skills.update((values) => {
			if (selectedSkill == null) {
				values.forEach((s) => {
					s.selected = false;
				});
			} else {
				updateMatrix(values, skill);
			}

			return values;
		});

		showDetails = true;
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

	$: if(data){
		initData();
	}
</script>

<div class="skill-tree-page" style="--skill-tree-bg-image: url({pageImage});">
	<style id="page-style"></style>
	<div
		class="viewer-panel"
		data-augmented-ui="bl-clip-inset br-clip-inset tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip both"
	>
		<div bind:this={canvas} class="skill-tree-container {data.attributes.slug}">
			<div
				class="skill-matrix"
				style="grid-template-columns: repeat({maxColumns}, 1fr); grid-template-columns: repeat({maxRows}, 1fr);"
			>
				{#if $skills?.length > 0}
					{#each $skills as skill, s (skill.id)}
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

	<div class="bottom-toolbar">
		<div class="left-group">
			<!-- <button>Button 1</button> 
			<button on:click={() => toggleSkill(selectedSkill)}>Toggle Skill</button>-->
		</div>
		<div class="right-group">
			<!-- <button>Button 2</button>
			<button on:click={() => (showDetails = !showDetails)}>Toggle Details</button> -->
		</div>
	</div>
</div>

<DetailsPanel bind:showDetails>
	{#if selectedSkill}
		<h1>{selectedSkill.attributes.name}</h1>
		<p>{@html marked.parse(selectedSkill?.attributes.description ?? '')}</p>
		<div class="toolbar">
			<button on:click={() => toggleSkill(selectedSkill)}> Toggle Skill </button>
		</div>
	{:else}
		<h1>No Skill Selected</h1>
	{/if}
</DetailsPanel>
<DetailsPanel side="left">
	<div class="specialty-details">
		<h1><i class="bi bi-icon-name" />{data.attributes.name}</h1>
	</div>
	<div>
		<!-- <h4><i class="bi bi-icon-page" />Description</h4>
		<p>{@html marked.parse(data?.attributes.description ?? '')}</p> -->

		<div>
			<h3>
				<i class="bi bi-icon-type" />Specialty: {data.attributes.specialty?.data?.attributes.name}
			</h3>
			<h4>Additional Skill Trees</h4>
			{#if data.attributes.specialty.data?.attributes.skillTrees?.data}
				{#each data.attributes.specialty.data?.attributes.skillTrees.data as tree}
					<a href={tree.attributes.slug}>
						<div data-augmented-ui class="small-menu-item">
							<h5><i class="bi bi-icon-type" />{tree.attributes.name}</h5>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</DetailsPanel>

<style>
	:root {
		--skill-tree-bg-image: none;
		/* url('/assets/imgs/landing-bg.png'); */
	}
	.small-menu-item {
		padding-block: 0.25em;
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
