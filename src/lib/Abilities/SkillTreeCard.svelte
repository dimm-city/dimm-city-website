<script>
	import { marked } from 'marked';
	import './skill-trees.css';
	import { createEventDispatcher } from 'svelte';

	/** @type DC.Ability */
	export let data;

	const dispatcher = createEventDispatcher();
	dispatcher('acquired', data);

	function toggleAcquired() {
		data.acquired = !data.acquired;
		dispatcher('acquired', data);
		
	}
</script>

<div
	class="skin-cell-container {data.attributes.slug}"
	class:selected={data.selected}
	class:unlocked={data.unlocked}
	class:acquired={data.acquired}
	role="button"
	tabindex="0"
	on:click
	on:dblclick
	on:keydown
>
	<div
		class="skill-cell"
		data-augmented2-ui="tl-clip tr-clip-x br-clip bl-clip both"
		data-skill-index={data.id}
	>
		<div class="skill-cell-inner">
			<div class="header">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<i class="bi" class:bi-unlock={data.unlocked} class:bi-lock={!data.unlocked}  />
				<h1>{data.attributes.name}</h1>
			</div>
			<div class="skill-description">
				{@html marked.parse(data?.attributes.shortDescription ?? '')}
			</div>
			<div class="bottom-toolbar">
				<div class="left-group">AP: {data.attributes.ap}</div>
				<div class="right-group">
					<i class="bi" class:bi-check={data.acquired} class:bi-x={!data.acquired} />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--skill-cell-bg-color: var(--dark);
		--skill-cell-border-color: rgba(68, 68, 68, 0.849);
		--skill-cell-border-radius: 10px;
		--skill-cell-glow-color: var(--light);
		--skill-cell-width: 250px;
		--skill-cell-height: 175px;
	}

	.skin-cell-container {
		cursor: pointer;
		position: relative;
		width: var(--skill-cell-width);
		height: var(--skill-cell-height);

		/* border: 1px solid var(--skill-cell-border-color);
		background-color: var(--skill-cell-bg-color);
		--aug-inlay-bg: transparent;
		--aug-border-bg: var(--skill-cell-border-color);
		--aug-border-all: 1px;
		--aug-tr1: 7px; */

		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.35);
		border-radius: var(--skill-cell-border-radius);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(3.7px);
		-webkit-backdrop-filter: blur(3.7px);
		border: 1px solid rgba(255, 255, 255, 0.59);
		transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
	}
	.skin-cell-container.selected {
		box-shadow: 0 0 15px 15px rgba(197, 197, 197, 0.911);
		transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
	}

	.skin-cell-container:before {
		position: absolute;
		content: ' ';
		top: 0;
		left: 0;
		width: var(--skill-cell-width);
		height: var(--skill-cell-height);
		box-shadow: none;
		transition: box-shadow 0.3s ease-in-out;
		transform: scale(0.85);
	}

	.unlocked {
		--skill-cell-border-color: var(--secondary-accent);
	}

	.acquired {
		--skill-cell-border-color: var(--fourth-accent);
	}

	.skill-cell {
		background-color: rgba(17, 17, 17, 0.75);

		color: var(--third-accent);
		font-size: 1rem;
		font-family: var(--main-font-family);
		border: 1px var(--third-accent) solid;

		width: var(--skill-cell-width);
		height: var(--skill-cell-height);

		border-radius: var(--skill-cell-border-radius);

		text-align: center;

		transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

		margin: 0;
		padding: 0;

		overflow: hidden;
		box-sizing: border-box;

		/* add glowing effect around cells */
		box-shadow: 0 0 10px 7px var(--skill-cell-border-color);
		transition: box-shadow 0.3s ease-in-out;
	}
	.skill-cell-inner {
		display: grid;
		grid-template-rows: min-content 1fr min-content;
		height: 100%;
		padding-bottom: 5px;
	}
	.skill-cell .header {
		display: flex;
		width: 100%;
		padding: 0.5rem 1rem;
		background-color: rgba(17, 17, 17, 0.75);
		border: 0;
		color: var(--third-accent);
		border-bottom: 1px var(--third-accent) solid;
		justify-content: space-evenly;
	}

	.skill-cell .header i {
		position: absolute;
		top: 7px;
		left: 13px;
		font-size: 1.25rem;
	}

	.skill-cell h1 {
		margin: 0;
		font-size: 1rem;
		text-wrap: balance;
	}
	.skill-cell .skill-description {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
	}
	:global(.skill-description p) {
		padding-inline: 0.5rem;
		margin: 0;
	}

	.bottom-toolbar {
		display: flex;
		justify-content: space-between;
		padding-bottom: 0;
		padding-inline: 1rem;
	}

	.left-group,
	.right-group {
		display: flex;
		gap: 0.25rem;
	}

	.bottom-toolbar {
		font-size: 1.25rem;
	}
</style>
