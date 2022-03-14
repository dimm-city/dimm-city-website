<script>
	import { page } from '$app/stores';
	import Character from '$lib/Characters/Character.svelte';
	import ContentPane from '$lib/ContentPane.svelte';
	import Shell from '$lib/Shell.svelte';
	import { showMenu } from '$lib/ShellStore';

	$showMenu = false;
	let tokenId =  $page.params.tokenId; 
</script>

<Shell title="Citizen">
	<ContentPane>
		
			<Character {tokenId} />		
	</ContentPane>
</Shell>
