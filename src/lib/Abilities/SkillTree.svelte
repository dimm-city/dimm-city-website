<script>
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
		// ...
	});

	onDestroy(() => {
		panzoomInstance.dispose();
	});

	/** @type DC.SkillTree */
	export let data;

	let skills = [];

	/** @type DC.Ability|null */
	let selectedSkill;

	/**
	 * @param {DC.Ability | null} skill
	 */
	function selectSkill(skill) {
		selectedSkill = skill;
		// Highlight children logic...
	}

	/**
	 * @param {any} parent
	 */
	function unlockChildren(parent) {
		// Unlocking children logic...
	}
</script>

<div bind:this={canvas} class="skill-tree-container">	
	{#if skills?.length > 0}
		{#each skills.filter((s) => s.attributes.parents?.data?.length < 1) as skill, s (skill.id)}		
			<button 
				on:click={() => selectSkill(skill)}
			>{skill.id}</button>
			
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

<style>
	.skill-tree-container{
		width: 90vw;
		height: 90vh;
		position: relative;
		display: grid;
		background-image: url('/assets/imgs/landing-bg.png');
		background-size: cover;
		background-repeat: no-repeat;
	}
	.skill-tree-container button {
		border: 1px solid var(--fourth-accent);
		position: absolute;
		top: 10px;
		height: 200px;
		width: 200px;
		aspect-ratio: 1;
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
