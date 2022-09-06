<script lang="ts">
	import Shell from '$lib/Components/NewShell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import SpecialtyMenu from '$lib/Specialties/SpecialtyMenu.svelte';
</script>

<Shell title="Specialties" enableSearch={true}>
	<ContentPane>
		<SpecialtyMenu />
	</ContentPane>
</Shell>
