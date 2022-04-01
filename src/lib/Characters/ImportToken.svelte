<script lang="ts">
	import { myCollection, districts } from '$lib/ShellStore';
	import CharacterStats from './Editors/CharacterStats.svelte';
	import StepWizard from 'svelte-step-wizard';
	import { Character } from './Character';
	import CharacterBiography from './Editors/CharacterBiography.svelte';
	import RoleSelector from './Editors/RoleSelectorMenu.svelte';
	import LocationSelector from './Editors/DistrictSelector.svelte';
	import Button from '$lib/Components/Button.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import { connect, loggedIn, sessionToken } from '$lib/ChainStore';
	export let tokenId;

	//ToDo: load token if not in local collection
	let token = $myCollection.find((s) => s.release + '-' + s.edition == tokenId);

	let character = new Character(token);
	character.currentLocation = {
		slug: '',
		name: ''
	};
	// character.eyes = getAttributeValue('EYES');
	// function getAttributeValue(attribKey) {
	// 	let result = token.attributes.find((a) => a.trait_type.toLowerCase() == attribKey.toLowerCase());
	// 	console.log('attrib', result, token.attributes);
	// 	return result ? result.value : '';
	// }

	// async function createCharacter(nextStep) {
	// 	nextStep();
	// }
	async function createCharacter(nextStep) {
		if (!$loggedIn) {
			connect();
		}

		character.slug = character.name.replace(' ', '-');
		window
			.fetch('http://localhost:1337/api/sporos/import/' + token.release + '/' + token.edition, {
				method: 'POST',
				headers: {
					authorization: $sessionToken,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(character)
			})
			.then(async (res) => {
				const { data, errors } = await res.json();
				if (res.ok) {
					console.log('saved', data);
					nextStep();
				}
			})
			.catch((reason) => {
				console.log('could not create character', reason);
			});
	}
	
</script>

<style>
	.step-container {
		height: 80vh;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 0.2fr auto 0.1fr;
	}
	.step-container div:nth-child(2) {
		display: flex;
		height: 70vh;
		width: 100%;
		justify-content: space-between;
		overflow-y: auto;
	}
	.step-container div:nth-child(3) {
		display: flex;
		justify-content: space-between;
	}
</style>

<StepWizard initialStep={1}>
	<StepWizard.Step num={1} let:nextStep>
		<div class="step-container fade-in">
			<div><h2>This is the first step is to give your Sporo a name...</h2></div>
			<div><CharacterStats {character} /></div>
			<div>
				<div />
				<Button on:click={nextStep}>continue</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={2} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div><h2>... now what is your Sporos story?</h2></div>
			<div><CharacterBiography {character} /></div>
			<div>
				<Button on:click={previousStep}>Go Back</Button>
				<Button on:click={nextStep}>continue</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={3} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div><h2>Where does your Sporo live in Dimm City?</h2></div>
			<div><LocationSelector bind:value={character.currentLocation.slug} /></div>
			<div class="button-bar">
				<Button on:click={previousStep}>go back</Button>
				<Button on:click={nextStep}>continue</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={4} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div><h2>What skills does your Sporo have?</h2></div>
			<div><RoleSelector {character} /></div>
			<div><Button on:click={previousStep}>Go Back</Button><Button on:click={nextStep}>continue</Button></div>
		</div>
	</StepWizard.Step>

	<StepWizard.Step num={5} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div><h2>Profile Complete</h2></div>
			<div>
				<p>
					You have completed {character.name}'s profile.
				</p>
			</div>
			<div>
				<Button on:click={previousStep}>Go Back</Button>
				<Button on:click={() => createCharacter(nextStep)}>Create your character</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={6} let:nextStep>
		<div class="step-container fade-in">
			<div><h2>Creating character</h2></div>
			<div>
				<p>
					<LoadingIndicator><div>compiling...</div></LoadingIndicator>
				</p>
			</div>
			<div>
				<Button on:click={() => createCharacter(nextStep)}>Create your character</Button>
			</div>
		</div>
	</StepWizard.Step>
</StepWizard>
