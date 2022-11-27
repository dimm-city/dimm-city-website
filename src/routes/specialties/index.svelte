<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import SpecialtyMenu from '$lib/Specialties/SpecialtyMenu.svelte';
</script>

<Shell title="Specialties" enableSearch={true}>
	<ContentPane padding={0}>
		<SpecialtyMenu />
	</ContentPane>
</Shell>
