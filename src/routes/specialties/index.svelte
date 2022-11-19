<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import SpecialtyMenu from '$lib/Specialties/SpecialtyMenu.svelte';
</script>

<Shell title="Specialties" enableSearch={true}>
	<ContentPane padding={0}>
		<SpecialtyMenu />
	</ContentPane>
</Shell>
