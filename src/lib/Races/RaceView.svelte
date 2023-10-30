<script>
	import Points from './Points.svelte';
	import StatsRow from './StatsRow.svelte';

	/** @type {DC.Race}*/
	export let race;
	export let isEditing = false;
	export let isPrinting = false;
</script>

<div class="scroll-wrapper">
	<div class="sheet" data-augmented-ui="none">
		<div class="heading">
			<div>
				{#if isEditing}
					<h1 contenteditable="true" bind:textContent={race.attributes.name} />
				{:else}
					<h1>
						{race.attributes.name ?? ''}
					</h1>
				{/if}
			</div>
			<div class="points-heading">
				<div
					class="scores-container"
					data-augmented-ui2="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
				>
					<Points data={race} {isEditing} {isPrinting} />
				</div>
			</div>
		</div>
		<article class="container" data-augmented-ui-reset>
			<StatsRow {race} />
			<div class="profile-row">
				<section class="section-container profile">
					<div>
						<div
							class="cell-frame"
							data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
						/>
						<h4>Common locations</h4>
						<ul>
							{#each race.attributes.locations.data as location}
								<li>{location.attributes.name}</li>
							{/each}
						</ul>
					</div>
					<div>
						<div
							class="cell-frame"
							data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
						/>
						<h4>Allies</h4>
						<ul>
							{#each race.attributes.allies.data as ally}
								<li>{ally.attributes.name}</li>
							{/each}
						</ul>
					</div>
					<div>
						<div
							class="cell-frame"
							data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
						/>
						<h4>Enemies</h4>
						<ul>
							{#each race.attributes.enemies.data as enemy}
								<li>{enemy.attributes.name}</li>
							{/each}
						</ul>
					</div>
				</section>
			</div>
			<div class="description-row">
				<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both" />
				<section class="section-container description">
					<div>
						<h3>Description</h3>
						<hr />
						<p>{race.attributes.description ?? 'Unable to locate description.'}</p>
					</div>
				</section>
			</div>
			<!-- <div class="description-row">
				<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both" />
				<section class="section-container description">
					
					<div>
						<h3>Problems</h3>
						<hr />
						<p>{race.attributes.problems ?? 'Unknown'}</p>
					</div>
					
				</section>
			</div>
			<div class="description-row">
				<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both" />
				<section class="section-container description">
					<div>
						<h3>Ideals</h3>
						<hr />
						<p>{race.attributes.ideals ?? 'Unknown'}</p>
					</div>
				</section>
			</div>
			<div class="description-row">
				<div class="row-frame" data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both" />
				<section class="section-container description">
					
					<div>
						<h3>Flaws</h3>
						<hr />
						<p>{race.attributes.flaws ?? 'Unknown'}</p>
					</div>					
				</section>
			</div> -->
		</article>
	</div>
</div>

<style>
	:root {
		--dc-bottom-toolbar-display: none;
	}
	.scroll-wrapper {
		display: grid;
		height: 100%;
		width: 100%;
		overflow: hidden;
		overflow-y: auto;
		padding-inline: 0.25rem;
	}
	.sheet {
		position: relative;

		--aug-border-all: 2px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 9px;
		--aug-tr: 9px;
		--aug-t-center: 33%;
		--aug-t: 10px;
		--aug-inlay-bg: transparent;
		--aug-l: 5px;
		--aug-r: 5px;
		width: 100%;
		height: 100%;
		color: var(--light);
	}
	div.heading {
		filter: var(--content-container-filter);
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		justify-items: center;
		align-items: end;
		color: var(--fourth-accent);
		white-space: nowrap;
		text-overflow: ellipsis;
		min-height: 75px;
	}
	div.heading > div {
		width: 100%;
		overflow: hidden;
	}

	div.heading > div:first-of-type {
		text-align: left;
		align-items: end;
		padding: 0;
	}
	div.heading > div:first-of-type::after {
		content: 'name:';
		width: 100%;
		display: block;
		border-top: thin var(--fourth-accent) solid;
	}

	div.heading > div:last-of-type {
		text-align: right;
	}
	.scores-container {
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 7px;
		--aug-tr: 7px;
		--aug-bl: 7px;
		--aug-br: 7px;
		padding-block: 0.5em;

		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: start;
		grid-area: scores-cell;
	}

	h1 {
		margin: 0;
	}

	h1[contenteditable],
	h1[contenteditable]:focus-visible {
		border: 1px var(--fourth-accent) solid;
		outline-color: var(--fourth-accent);
		outline-width: 1px;
	}
	.points-heading {
		display: flex;
		justify-content: end;
	}
	.container {
		height: max-content;
		width: 100%;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, min-content) auto;
		gap: 1.5rem;
	}

	:global(.image > div) {
		--aug-b: 0px;
		--aug-l: 0px;
		--aug-t: 0px;
		--aug-tr: 7px;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
	}
	:global(.row-frame, .cell-frame) {
		--aug-inlay: initial;
		--aug-inlay-bg: var(--content-container-background);
	}

	.section-container.profile {
		display: grid;
		grid-area: profile;
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: 0.75rem;
		grid-auto-flow: row;
	}

	.section-container.profile > div {
		position: relative;
		padding: 1.5rem;
	}

	.profile-row,
	.description-row {
		position: relative;
		width: 100%;

		padding-block: 2rem;
		padding-inline: 1rem;
	}
	.profile-row {
		padding: 0;
	}

	.row-frame {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
	}

	.cell-frame {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
	}
	/**race*/
	h4 {
		margin: 0;
		color: var(--fourth-accent);
	}

	ul {
		padding: 0;
	}

	@media screen and (max-width: 900px) {
		.scroll-wrapper {
			overflow-y: auto;
			padding-inline: 0.5rem;
		}
		div.heading {
			grid-template-columns: 1fr;
			grid-template-rows: min-content;
		}
		.scores-container {
			display: flex;
			justify-content: center;
			width: 100%;
		}

		.section-container.profile {
			grid-template-columns: repeat(1, 1fr);
			gap: 1rem;
		}

		.scores-container {
			padding: 2em;
		}
		.points-heading {
			display: none;
		}
		.container {
			grid-template-rows: repeat(5, min-content) auto;
		}
	}
</style>
