<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import ProfileView from '$lib/Profile/ProfileView.svelte';
</script>

<Shell title="Console">
	<ContentPane padding={2}>
		<div class="content-container">
			<LoggedInContainer>
				<div class="fade-in">
					<ProfileView />
				</div>
			</LoggedInContainer>
		</div>
	</ContentPane>
</Shell>
