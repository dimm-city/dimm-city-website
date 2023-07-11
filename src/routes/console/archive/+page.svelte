<script lang="ts">
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import WalletsView from '$lib/Wallets/WalletsView.svelte';
	
</script>

<Shell title="Your Archives" titleUrl="/console/archive">
	<ContentPane padding={2}>
		<LoggedInContainer>
			<WalletsView />
		</LoggedInContainer>
	</ContentPane>
</Shell>
