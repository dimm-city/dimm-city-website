<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import ImportCharacter from '$lib/Characters/ImportCharacter.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Shell from '$lib/Components/Shell.svelte';
    import { fullscreen } from "$lib/Shared/ShellStore";

	$fullscreen = true;
	let tokenId = $page.params.tokenId;
</script>

<Shell title="Create Character">
	<ContentPane>
		<ImportCharacter {tokenId} />
	</ContentPane>
</Shell>
