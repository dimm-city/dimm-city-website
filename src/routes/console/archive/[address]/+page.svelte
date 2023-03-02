<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import WalletView from '$lib/Wallets/WalletView.svelte';
	import { profile } from '$lib/Shared/Stores/UserStore';
	import { page } from '$app/stores';

	//export let data = { address: '', network: { chainId: 0 } };
	$: data = $profile?.wallets?.find(w => w.address == $page.params.address);
</script>

<Shell title="Your Archives" titleUrl="/console/archive">
	<ContentPane padding={2}>
		<LoggedInContainer>
			<h2>Manage Archive</h2>
			<WalletView wallet={data} />
		</LoggedInContainer>
	</ContentPane>
</Shell>
