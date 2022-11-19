<script context="module">
	export const prerender = false;
</script>

<script>
	import CreateCharacter from '$lib/Characters/CreateCharacter.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Shell from '$lib/Components/Shell.svelte';
	import { fullscreen } from '$lib/Shared/ShellStore';
	$fullscreen = true;
</script>

<Shell title="Create Character">
	<ContentPane>
		<CreateCharacter />
	</ContentPane>
</Shell>
