<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import WalletsView from '$lib/Profile/WalletsView.svelte';
	
	export let data;
</script>

<Shell title="Your Archives" titleUrl="/console/archive">
	<ContentPane padding={2}>
		<LoggedInContainer>
			<h2>Manage Archive</h2>
		</LoggedInContainer>
	</ContentPane>
</Shell>
