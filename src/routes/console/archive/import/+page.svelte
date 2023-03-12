<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import AttachUserWallet from '$lib/Wallets/AttachUserWallet.svelte';
	
</script>

<Shell title="Your Archives" titleUrl="/console/archive">
	<ContentPane padding={2}>
		<LoggedInContainer>
			<AttachUserWallet />
		</LoggedInContainer>
	</ContentPane>
</Shell>
