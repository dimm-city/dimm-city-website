<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import Button from '$lib/Shared/Components/Button.svelte';
</script>

<Shell title="Login">
	<ContentPane padding={0}>
		<LoggedInContainer>
			<Button url="/console">View Your Console</Button>
		</LoggedInContainer>
	</ContentPane>
</Shell>
