<script lang="ts">
	import { myCollection, districts } from '$lib/ShellStore';
	import CharacterStats from './Editors/CharacterStats.svelte';
	import StepWizard from 'svelte-step-wizard';
	import { Character, type ISummaryItem } from './Character';
	import CharacterBiography from './Editors/CharacterBiography.svelte';
	import SpecialtySelector from './Editors/SpecialtySelector.svelte';
	import LocationSelector from './Editors/DistrictSelector.svelte';
	import Button from '$lib/Components/Button.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import { connect, loggedIn, sessionToken } from '$lib/ChainStore';

	export let tokenId;

	let isSaving = false;

	//ToDo: load token if not in local collection
	let token = $myCollection.find((s) => s.release + '-' + s.edition == tokenId);

	let character = new Character(token);
	character.currentLocation = {
		id: 8
	} as ISummaryItem;

	function cancelImport() {
		if (window.history.length > 0) window.history.back();
		else window.location.href = '/console';
	}
	async function createCharacter(nextStep) {
		isSaving = true;
		if (!$loggedIn) {
			connect();
		}

		let importData = JSON.parse(JSON.stringify(character));
		importData.slug = character.name.replace(' ', '-');
		// importData.currentLocation = character.currentLocation.id;
		// importData.specialties = character.specialties.map(r => r.id);

		window
			.fetch('http://localhost:1337/api/sporos/import/' + token.release + '/' + token.edition, {
				method: 'POST',
				headers: {
					authorization: $sessionToken,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(importData)
			})
			.then(async (res) => {
				const { data, errors } = await res.json();
				if (res.ok) {
					console.log('saved', data);
					nextStep();
				} else {
					//TODO: display error
				}
				isSaving = false;
			})
			.catch((reason) => {
				console.log('could not create character', reason);
				isSaving = false;
			});
	}
</script>

<style>
	.step-container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 0.1fr;
		padding: 1rem 0;
	}
	.step-container div:nth-child(1) {
		min-height: 70vh;
		height: 100%;
		width: 100%;
		justify-content: space-between;
		overflow-y: auto;
	}
	.button-row {
		display: flex;
		justify-content: space-between;
	}
</style>

<StepWizard initialStep={1}>
	<StepWizard.Step num={1} let:nextStep>
		<div class="step-container fade-in">
			<div>
				<CharacterStats {character} readonly={false} title="This is the first step is to give your Sporo a name..." />
			</div>
			<div class="button-row">
				<Button on:click={cancelImport}>cancel</Button>
				<Button on:click={nextStep}>continue</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={2} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div>
				<CharacterBiography {character} readonly={false} title="... now what is your Sporos story?" />
			</div>
			<div class="button-row">
				<Button on:click={previousStep}>Back</Button>
				<Button on:click={cancelImport}>cancel</Button>
				<Button on:click={nextStep}>continue</Button>
			</div>
		</div>
	</StepWizard.Step>
	<!-- <StepWizard.Step num={3} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div><h2>Where does your Sporo live in Dimm City?</h2></div>
			<div><LocationSelector bind:value={character.currentLocation.id} /></div>
			<div class="button-bar">
				<Button on:click={previousStep}>go back</Button>
				<Button on:click={nextStep}>continue</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={4} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div><h2>What skills does your Sporo have?</h2></div>
			<div><SpecialtySelector {character} /></div>
			<div><Button on:click={previousStep}>Go Back</Button><Button on:click={nextStep}>continue</Button></div>
		</div>
	</StepWizard.Step> -->

	<StepWizard.Step num={3} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div class="centered-container h-100">
				<div>
					<h2>Profile Complete</h2>
					<p>
						You have completed {character.name}'s profile.
					</p>
					<p>
						Click the <strong>complete</strong> button to save this data and submit it to the Dimm City Archive.
					</p>
					{#if isSaving}
						<LoadingIndicator><div class="centered-container">compiling...</div></LoadingIndicator>
					{/if}
				</div>
			</div>
			<div class="button-row">
				<Button on:click={previousStep}>Back</Button>
				<Button on:click={cancelImport}>cancel</Button>
				<Button on:click={() => createCharacter(nextStep)}>Complete</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={4} let:nextStep let:previousStep>
		<div class="step-container fade-in">
			<div><h2>Profile Submitted</h2></div>
			<div class="button-row">
				<Button on:click={previousStep}>Go Back</Button>
				<!-- <Button on:click={() => createCharacter(nextStep)}>Create your character</Button> -->
			</div>
		</div>
	</StepWizard.Step>
</StepWizard>
