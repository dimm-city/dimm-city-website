<script>
	import { onMount } from 'svelte';

	/** @type DC.SkillTree */
	export let data;

	let skills = [];

	/** @type DC.Ability|null */
	let selectedSkill;

	function selectSkill(skill) {
		selectedSkill = skill;
		// Highlight children logic...
	}

	function unlockChildren(parent) {
		// Unlocking children logic...
	}

	let canvas;
	let canvasWidth = 800;
	let row = 0;
	let column = 0;
	onMount(() => {
		// Initial rendering or any setup...
		skills = data.attributes.abilities.data;
		canvasWidth = canvas?.clientWidth ?? 800;
		console.log(canvas);
	});
</script>

<svg class="skill-tree" bind:this={canvas}>
	{#if skills?.length > 0}
		{#each skills.filter((s) => s.attributes.parents?.data?.length < 1) as skill, s (skill.id)}		
			{(skill.x = canvasWidth - Math.random() * canvasWidth)}
			{(skill.y = skill.id + 50 * s)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<circle
				class="skill {skill.id ? 'unlocked' : 'locked'}"
				cx={skill.x}
				cy={skill.y}
				r="20"
				on:click={() => selectSkill(skill)}
			/>
			{#if selectedSkill && selectedSkill.id === skill.id}
				<!-- Info button -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<text x={skill.x + 25} y={skill.y} font-size="20" on:click={() => unlockChildren(skill)}
					>i</text
				>
			{/if}
			{#each skill.attributes.children?.data ?? [] as child, c (c)}
				{child.x = skill.x + (c * 100)}
				<line class="line" x1={skill.x} y1={skill.y} x2={child.x} y2={skill.y + 100} />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<circle
					class="skill {skill.id ? 'unlocked' : 'locked'}"
					cx={child.x}
					cy={skill.y + 100}
					r="20"
					on:click={() => selectSkill(skill)}
				/>
			{/each}
		{/each}
	{/if}
</svg>

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
