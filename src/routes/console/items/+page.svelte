<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import ProfileView from '$lib/Profile/ProfileView.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	let modelUrl = '/assets/pink-dagger.glb';
</script>

<Shell title="Console">
	<ContentPane padding={2}>
		<div class="content-container">
			<div class="fade-in">
				<Image {modelUrl} />
			</div>
            <hr />
            <input type="text" bind:value={modelUrl} />
		</div>
	</ContentPane>
</Shell>
<style>
    hr{
        margin-block: 1rem;
    }
</style>