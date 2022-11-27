<script lang="ts">
	import Button from '$lib/Shared/Components/Button.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import ReleaseSelector from './Components/ReleaseSelector.svelte';

	let selectedRelease;
	function releaseSelected() {
		console.log(selectedRelease);
	}
</script>

<LoggedInContainer>
	<div class="step-container fade-in">
		<div>
			<h3>Which collection?</h3>
			<ReleaseSelector bind:selectedRelease on:change={releaseSelected} />
			<Button url={'/console/characters/create/' + selectedRelease?.slug}>Continue</Button>
		</div>
	</div>
</LoggedInContainer>
