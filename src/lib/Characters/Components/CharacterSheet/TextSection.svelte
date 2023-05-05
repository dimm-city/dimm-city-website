<script>
	import Textarea from '$lib/Shared/Components/Textarea.svelte';
	import markdownit from 'markdown-it';

	import { openModal, closeAllModals } from 'svelte-modals';
	import ContentModal from '../ContentModal.svelte';
	export let data = '';
	export let header = '';
	export let isEditing = false;

	const md = new markdownit();
	let aug = 'tr-clip bl-clip border';

	/**
	 * @type {import("svelte-modals/store").SvelteModalComponent<any, any, any> | import("svelte-modals/store").LazySvelteModalComponent<any, any, any> | ContentModal}
	 */
	let modal;
	function toggleFullscreen() {
		openModal(ContentModal, {
			data,
			isEditing,
			onClose: (x) => {
				console.log('confirmed modal', x);
				data = x;
				closeAllModals();
			}
		});
	}
</script>

<section class="section-container">
	<div class="text-section">
		<div class="text-section-header">
			<span>{header}:</span>
			<i
				class="btn inline bi"
				class:bi-fullscreen={toggleFullscreen}
				class:bi-fullscreen-exit={toggleFullscreen}
				on:keypress={toggleFullscreen}
				on:click={toggleFullscreen}
			/>
		</div>
		<div class="text-section-content">
			{#if isEditing}
				<Textarea bind:value={data} />
			{:else}
				<div class="text-container" data-augmented-ui={aug}>
					{@html md.render(data ?? '')}
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

	.text-section {
		height: 90%;
		width: 100%;
		align-content: start;
	}
	.text-section-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		font-weight: bold;
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
</style>
