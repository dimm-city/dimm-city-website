<script>
	import CreateCharacter from '$lib/Characters/CreateCharacter.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
</script>

<Shell title="Create a Character" fullscreen={true}>
	<ContentPane>
		<CreateCharacter />
	</ContentPane>
	<div slot="left-button">
		<!-- <a
		
		class="aug-button"
		data-augmented-ui="all-hex"
		title="cancel"
		href="/console"
	>
		<i class="bi bi-x-octagon" /></a
	> -->
	</div>
</Shell>
