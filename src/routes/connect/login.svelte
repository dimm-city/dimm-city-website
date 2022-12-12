<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { onMount } from 'svelte';
	import { connect, loggedIn } from '$lib/Shared/Stores/UserStore';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import Button from '$lib/Shared/Components/Button.svelte';


</script>

<Shell title="Console">
	<ContentPane padding={0}>
		<div class="content-container">
				<div class="fade-in">
					<Button url="http://localhost:1337/api/connect/reddit">Login with Reddit</Button>
				</div>
		</div>
	</ContentPane>
</Shell>
