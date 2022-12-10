<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spore } from '../Spore';
	export let spore: Spore;

	onMount(() => {
		document.documentElement.style.setProperty(
			'--cover-image',
			`url('${spore.imageUrl ?? '/assets/imgs/the-archive-district.png'}')`
		);
		// document.documentElement.style.setProperty('--front-cover-margin-top', '2in');
	});
</script>

<style>
	.front-cover::before {
		content: ' ';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-image: var(--cover-image);
		background-position: top;
		background-size: contain;
		background-repeat: no-repeat;
		background-clip: content-box;
		background-blend-mode: overlay;
		opacity: 1;
		z-index: -1;
	}
</style>

<div class="panel front-cover" data-augmented-ui>
	<div class="container" data-update>
		<h1>{spore.name}</h1>
		<h3>{spore.subtitle}</h3>
		{@html spore.introduction}
	</div>
</div>
