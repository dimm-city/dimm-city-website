<script>
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	export let data = '';
	export let header = '';
	export let isEditing = false;
	export let isFullscreen = false;
	let aug = 'tr-clip bl-clip border';
	$: aug = isFullscreen ? '' : 'tr-clip bl-clip border';
	/**
	 * @type {HTMLDivElement}
	 */
	let content;
	function toggleFullscreen() {
		isFullscreen = !isFullscreen;	
		content.scrollIntoView();
	}
</script>

<section class="section-container" class:fullscreen={isFullscreen}>
	<div class="text-section">
		<div class="text-section-header" bind:this={content}>
			<span>{header}:</span>
			<i
				class="btn inline bi"
				class:bi-fullscreen={!isFullscreen}
				class:bi-fullscreen-exit={isFullscreen}
				on:keypress={toggleFullscreen}
				on:click={toggleFullscreen}
			/>
		</div>
		<div class="text-section-content">
			{#if isEditing}
				<Textarea bind:value={data} />
			{:else}
				<div class="text-container" data-augmented-ui={aug}>
					{data ?? ''}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.section-container {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: stretch;
		justify-content: stretch;
		gap: 0.5rem;
		transition: all 200ms;
	}

	.section-container.fullscreen {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: start;
		padding: 1.5rem;
		background-color: rgba(17, 17, 17, 1);
		height: 100%;
		width: 100%;
		z-index: 1000;
	}
	.text-section {
		height: 90%;
		width: 100%;
		align-content: start;
	}
	.text-section-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.text-section-content {
		display: flex;
		height: 100%;
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

	.fullscreen .text-container {
		overflow-y: scroll;
		text-overflow: unset;
		max-height: max-content;
		--aug-border-all: 0px;
		--aug-border-bg: var(--fourth-accent);
	}
	/* .fullscreen .text-section-content{
		width: 50%;
	} */

	/* @media (max-width: 1199px) {
		.fullscreen .text-section {
			width: 90%;
		}
	} */
</style>
