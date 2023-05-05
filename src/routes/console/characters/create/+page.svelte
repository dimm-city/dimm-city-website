<script>
	import CreateCharacter from '$lib/Characters/CreateCharacter.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
</script>

<Shell title="Select a release" fullscreen={true}>
	<ContentPane>
		<CreateCharacter />
	</ContentPane>
</Shell>
