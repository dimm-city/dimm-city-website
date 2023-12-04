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
		availableSkills,	
		selectedSkill,
		acquireSkill,
		removeSkill,
		selectSkill
	} from './BuilderStore';
	import { getNotificationsContext } from 'svelte-notifications';

	const {addNotification} = getNotificationsContext();
	/**
	 * @type {import("panzoom").PanZoom}
	 */
	let panzoomInstance;

	/**
	 * @type {HTMLElement | SVGElement | null}
	 */
	let canvas;

	/**
	 * @type {import('svelte/store').Writable<boolean>}
	 */
	let showDetails = writable(false);


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



	/**
	 * @param {DC.Ability | null} skill
	 * @param {MouseEvent} e
	 */
	function onSelectSkill(e, skill) {
		e.preventDefault();
		selectSkill(skill);

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
		if (!skill) return;
		if (skill.acquired) await removeSkill(skill);
		else await acquireSkill(skill);

		addNotification({
			id: `${new Date().getTime()}-${Math.floor(Math.random() * 9999)}`,
			position: 'top-right',
			removeAfter: 3000,
			allowRemove: true,
			heading: 'skill-updated',
			type: 'info',
			text: 'skills have been saved'
		});
	}


</script>

<div class="skill-tree-page" style="--skill-tree-bg-image: url({$selectedSkillTree.pageImage});">
	<style id="page-style"></style>
	<div class="viewer-panel">
		<div bind:this={canvas} class="skill-tree-container {$selectedSkillTree?.attributes?.slug}">
			<div
				class="skill-matrix"
				style="grid-template-columns: repeat({$selectedSkillTree.maxColumns}, 1fr); grid-template-columns: repeat({$selectedSkillTree.maxRows}, 1fr);"
			>
				{#if $availableSkills?.length > 0}
					{#each $availableSkills as skill (skill.id)}
						<div
							class="matrix-cell"
							style="grid-row: {skill.attributes.level}; grid-column: {skill.attributes.module};"
						>
							<SkillTreeCard
								selected={skill.id == $selectedSkill?.id}
								acquired={skill.acquired}
								unlocked={skill.unlocked}
								data={skill}
								on:click={(e) => onSelectSkill(e, skill)}
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
