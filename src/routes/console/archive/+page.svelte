<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';	
	import TokensList from '$lib/Tokens/TokensList.svelte';
</script>

<Shell title="Console" titleUrl="/console">
	<ContentPane padding={3}>
		<LoggedInContainer>
			<TokensList />
		</LoggedInContainer>
	</ContentPane>
</Shell>
