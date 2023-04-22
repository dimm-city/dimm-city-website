<script>
	// @ts-nocheck

	import Input from '$lib/Shared/Components/Input.svelte';

	/**
	 * @type {ICharacter}}
	 */
	export let character;
	export let isEditing = false;
	export let viewText = (text) => {};
</script>

<div class="profile-row" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip border">
	<div class="profile-heading"><h3>Profile</h3></div>
	<section class="section-container">
		<div>
			Vibe:
			{#if isEditing}
				<span contenteditable bind:textContent={character.vibe} />
			{:else}
				<span>{character.vibe} </span>
			{/if}
		</div>
		<div>
			Beliefs:
			{#if isEditing}
				<span contenteditable bind:textContent={character.beliefs} />
			{:else}
				<span>{character.beliefs ?? 'Unknown'} </span>
			{/if}
		</div>
		<div>
			Flaws:
			{#if isEditing}
				<span contenteditable bind:textContent={character.flaws} />
			{:else}
				<span>{character.flaws ?? 'Unknown'} </span>
			{/if}
		</div>
		<div>
			Origin:<span>{character.currentLocation?.name ?? 'Unknown'} </span>
		</div>
		<div>
			Current District:
			{#if isEditing}
				<span>[Location selector]</span>
			{:else}
				<span>{character.currentLocation?.name ?? 'Unknown'} </span>
			{/if}
		</div>
	</section>
	<section class="section-container">
		<div class="text-section">
			<div class="text-section-header">
				<span>Backstory:</span>
				<i
					class="btn inline bi bi-fullscreen"
					on:keypress={() => viewText(character.backstory)}
					on:click={() => viewText(character.backstory)}
				/>
			</div>
			<div class="text-container" data-augmented-ui=" tr-clip bl-clip border">
				{character.backstory}
			</div>
		</div>
	</section>
	<section class="section-container">
		<div class="text-section">
			<div class="text-section-header">
				<span>Dreams:</span>
				<i
					class="btn inline bi bi-fullscreen"
					on:keypress={() => viewText(character.dreams)}
					on:click={() => viewText(character.dreams)}
				/>
			</div>
			<div class="text-container" data-augmented-ui="tr-clip bl-clip  border">
				{character.dreams}
			</div>
		</div>
	</section>
</div>

<style>
	*[contenteditable]{
		border: var(--fourth-accent) solid thin;
		border-radius: 0.25rem;
		min-width: 5ch;
		content: '';
		display: inline-block;
		padding-inline: 0.25rem;
	}
	h3 {
		margin: 0;
		color: var(--fourth-accent);
	}
	span {
		margin-left: 0.5rem;
	}
	.section-container {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: stretch;
		justify-content: space-evenly;
		gap: 0.5rem;
	}

	.profile-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: min-content 1fr;
		grid-auto-flow: row;
		grid-template-areas:
			'heading heading heading'
			'. . .';
		width: 100%;
		--aug-border-all: 1px;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-tl: 13px;
		--aug-tr: 13px;
		--aug-bl: 13px;
		--aug-br: 13px;
		--aug-inlay: 0;
		padding-block: 1rem;
		padding-inline: 2rem;
		gap: 1.5rem;
		row-gap: 0.25rem;
		align-content: center;
	}

	.profile-heading {
		grid-area: heading;
	}
	.text-section {
		display: grid;
		height: 100%;
		align-content: start;

	}
	.text-section-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.text-section span {
		display: block;
		margin-bottom: 0.5rem;
		margin-left: 0;
	}
	.text-container {
		display: grid;
		width: 100%;
		min-height: 7rem;
		max-height: 12rem;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0.5rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
	}

	@media (max-width: 768px) {
		.profile-row {
			padding-top: 2rem;
			grid-template-columns: 1fr;
			grid-template-rows: min-content repeat(3, 1fr);
			grid-auto-flow: row;
			grid-template-areas:
				'heading'
				'.'
				'.'
				'.';
		}
	}
</style>
