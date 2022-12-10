<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spore } from '../Spore';
	export let spore: Spore;

	onMount(() => {
		document.documentElement.style.setProperty('--cover-image', "url('../imgs/the-archive-district.png')");
		document.documentElement.style.setProperty('--front-cover-margin-top', '2in');
	});
</script>

<div class="panel front-cover" data-augmented-ui>
	<div class="container" data-update>
		<h1>{spore.name}</h1>
		<h3>{spore.subtitle}</h3>
		{spore.introduction}
	</div>
</div>
