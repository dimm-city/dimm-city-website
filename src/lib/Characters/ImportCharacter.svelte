<script lang="ts">
	import { myCollection, districts } from '$lib/Shared/Stores/ShellStore';
	import CharacterStats from './Components/Tabs/CharacterStats.svelte';
	import StepWizard from 'svelte-step-wizard';
	import { Character } from './Models/Character';
	import CharacterBiography from './Components/Tabs/CharacterBiography.svelte';
	import Button from '$lib/Shared/Components/Button.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import { connect, loggedIn, sessionToken } from '$lib/Shared/Stores/ChainStore';
	import { config } from '$lib/Shared/config';
	import type { ISummaryItem } from '$lib/Shared/Models/ISummaryItem';
	export let tokenId;

	let isSaving = false;

	//ToDo: load token if not in local collection
	let token = $myCollection.find((s) => s.release.toLowerCase() + '-' + s.edition == tokenId.toLowerCase());

	let character = new Character(token);
	character.currentLocation = {
		id: 8
	} as ISummaryItem;

	function cancelImport() {
		// if (window.history.length > 0) window.history.back();
		// else 
		window.location.href = '/console';
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
			.fetch(config.apiBaseUrl + '/sporos/import/' + token.release + '/' + token.edition, {
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
					console.log('saved');

					token.name = character.name;
					token.description = character.vibe;
					token.hasCharacter = true;
					$myCollection = [token, ...$myCollection.filter((s) => s.release + '-' + s.edition != tokenId)];

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
		min-height: max-content;
		height: 100%;
		width: 100%;
		justify-content: space-between;
		overflow-y: auto;
	}
	.button-row {
		display: flex;
		justify-content: space-between;
	}
	.step-container div:nth-child(1) .centered-container {
		height: fit-content;
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
				<div class="">
					<h2>Profile Complete</h2>
					<p>
						You have completed {character.name}'s profile.
					</p>
					<p>
						Click the <strong>complete</strong> button to save this data and submit it to the Dimm City Archive.
					</p>

					<p>
						Please note that submitting this information to the Dimm City Archive will make it freely available to the
						public. All information submitted to the archive will be considered to be available on the CC-BY license
						unless otherwise stated. Contact the founders if you would like more information.
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
			<div>
				<h2>Profile Submitted</h2>
			</div>
			<div class="button-row">
				<Button url={'/citizens/' + token.release + '-' + token.edition}>View Citizen File</Button>
				<Button url="/console">Return to Op Console</Button>
				<!-- <Button on:click={() => createCharacter(nextStep)}>Create your character</Button> -->
			</div>
		</div>
	</StepWizard.Step>
</StepWizard>
