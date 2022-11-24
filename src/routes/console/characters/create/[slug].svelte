<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import BuyCharacter from '$lib/Characters/BuyCharacter.svelte';

	import CreateCharacter from '$lib/Characters/SelectRelease.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Shell from '$lib/Components/Shell.svelte';
    let releaseKey = $page.params.slug;
</script>

<Shell title="Generate Sporo" fullscreen={true}>
	<ContentPane>
		<BuyCharacter {releaseKey}/>
	</ContentPane>
</Shell>
