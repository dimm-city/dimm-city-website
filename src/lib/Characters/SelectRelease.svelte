<script lang="ts">
	import { myCollection, districts } from '$lib/Shared/ShellStore';
	import StepWizard from 'svelte-step-wizard';
	import type { ICharacter, IToken } from './Character';
	import CharacterBiography from './Tabs/CharacterBiography.svelte';
	import Button from '$lib/Components/Button.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import { connect, loggedIn, sessionToken } from '$lib/Shared/ChainStore';
	import ReleaseSelector from './Components/ReleaseSelector.svelte';
	import type { ICharacterRelease } from './Components/ICharacterRelease';
		
	let selectedRelease;
	function releaseSelected() {
		console.log(selectedRelease);
		document.location = '/console/characters/create/' + selectedRelease.slug.toLowerCase();
	}
	// async function createCharacter(cb) {
	// 	console.log('creating...');
	// 	cb();
	// }
</script>

<div class="step-container fade-in">
	{#if $loggedIn}
		<div>
			<h3>Which collection?</h3>
			<ReleaseSelector bind:selectedRelease on:change={releaseSelected} />
		</div>		
	{:else}
		<div>Login to continue</div>
	{/if}
</div>
