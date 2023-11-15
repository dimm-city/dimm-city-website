<script>
	import { marked } from 'marked';
	import './skill-trees.css';

	/** @type DC.Ability */
	export let data;
</script>

<div
	class="skin-cell-container {data.attributes.slug}"
	class:selected={data.selected}
	class:unlocked={data.unlocked}
	class:acquired={data.acquired}
>
	<button
		on:click
		class="skill-cell"
		data-skill-index={data.id}
		data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both"
	>
		<div class="aug-border" />
		<div class="skill-cell-inner">
			<!-- <div class="top-toolbar">
			<i class="bi bi-braces" /></div> -->
			<div class="header">
				<i class="bi" class:bi-unlock={data.unlocked} class:bi-lock={!data.unlocked} />
				<h1 class="skill-button">{data.attributes.name}</h1>
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
	</button>
</div>

<style>
	:root {
		--skill-cell-bg-color: var(--dark);
		--skill-cell-border-color: rgba(68, 68, 68, 0.849);
		--skill-cell-glow-color: var(--light);
		--skill-cell-width: 250px;
		--skill-cell-height: 175px;
	}

	.skin-cell-container {
		position: relative;
		width: var(--skill-cell-width);
		height: var(--skill-cell-height);
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

	.skin-cell-container.selected:before {
		box-shadow: 1px -1px 35px 23px var(--skill-cell-glow-color);
		filter: blur(5px);
		/*scale to 1.1*/
	}
	.aug-border {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		box-shadow: inset 0px 0px 0px 0px var(--skill-cell-border-color);
		transition: box-shadow 0.3s ease-in-out;

		z-index: -1;
		pointer-events: none;
		transition: all 0.3s ease-in-out;
		--aug-border-bg: var(--skill-cell-border-color);
		--aug-border-all: 1px;
	}

	.unlocked {
		--skill-cell-border-color: var(--secondary-accent);
	}
	.unlocked .aug-border {
		box-shadow: inset 0px -3px 9px 3px var(--skill-cell-border-color);
	}
	.acquired {
		--skill-cell-border-color: var(--fourth-accent);
	}
	.acquired .aug-border {
		box-shadow: inset 0px -3px 9px 3px var(--skill-cell-border-color);
	}

	.skill-cell {
		width: var(--skill-cell-width);
		height: var(--skill-cell-height);
		border: 1px solid var(--skill-cell-border-color);
		background-color: var(--skill-cell-bg-color);
		--aug-border-bg: var(--skill-cell-border-color);
		transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
		padding-bottom: 0.5rem;
		--aug-border-all: 1px;
		--aug-tr1: 7px;
		text-align: center;
		cursor: pointer;
		margin: 0;
		padding: 0;

		box-sizing: border-box;

		/* add glowing effect around cells */
		box-shadow: 3px -1px 20px 7px var(--skill-cell-border-color);
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
		font-family: var(--main-font-family);
		border: 1px var(--third-accent) solid;
		justify-content: space-evenly;
		align-content: start;
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
		padding-bottom: 0.75rem;
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
