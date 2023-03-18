<script lang="ts">
	import './Characters.css';
	import StepWizard from 'svelte-step-wizard';
	import Button from '$lib/Shared/Components/Button.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import type { ICharacterRelease } from './Models/ICharacterRelease';
	import { getCharacterReleases } from './Queries/getCharacterReleases';
	import { onMount } from 'svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import type { ICharacter, IToken } from './Models/Character';
	import StripePayment from '$lib/Shared/Components/StripePayment.svelte';
	import Article from '$lib/Shared/Components/Article.svelte';
	import Toolbar from '$lib/Shared/Components/Toolbar.svelte';
	import { profile } from '$lib/Shared/Stores/UserStore';

	
	let stripe;
	let processing = false;
	let isSaving = false;
	let token: ICharacter;
	let releases = [];
	let selectedRelease: ICharacterRelease = {
		name: '',
		id: 0,
		slug: 'na-000',
		description: '',
		imageUrl: '',
		videoUrl: '',
		thumbnailUrl: '',
		tags: '',
		author: '',
		contractAddress: '',
		abi: null,
		totalSupply: 0,
		maxSupply: 0,
		metadataBaseUri: ''
	};
	$: metadata = {
		slug: selectedRelease.slug,
		user: $profile.id,
	}
	onMount(async () => {
		const data = await getCharacterReleases();
		releases = data;
		selectedRelease = releases.find((r) => true || r.slug == releaseKey) as ICharacterRelease;
	});

	function cancel() {
		if (window.history.length > 0) window.history.back();
		else window.location.href = '/console';
	}
	// async function buy(nextStep: Function) {
	// 	///token = await createSporo(selectedRelease);
	// 	console.log('buy', token);
	// 	nextStep();
	// }
</script>

<LoggedInContainer>
	<StepWizard initialStep={1}>
		<StepWizard.Step num={1} let:previousStep let:nextStep>
			<div class="step-container release-step  fade-in">
				<div>
					<h4>Select which collection you would like to create a character from</h4>
					{#each releases as release}
						<button
							class="aug-button hex"
							class:selected={selectedRelease == release}
							data-augmented-ui
							on:click={() => (selectedRelease = release)}
							><i class={release.icon} /><span>{release.slug}</span></button
						>
					{/each}
				</div>
				<div>
					<Article model={selectedRelease} imageHeight="200px" />
					<!-- <small>
						{#if selectedRelease?.id > 0}
							<span
								>{selectedRelease.totalSupply} sporos created our of {selectedRelease.maxSupply} in this
								release</span
							>
						{/if}
					</small> -->
				</div>
				<div class="button-row">
					<button data-augmented-ui class="aug-button" on:click={cancel}>cancel</button>
					<button data-augmented-ui class="aug-button" on:click={nextStep}>continue</button>

					<!-- <Button on:click={() => buy(nextStep)}>create sporo</Button> -->
				</div>
			</div>
		</StepWizard.Step>
		<StepWizard.Step class="Step" num={2} let:previousStep let:nextStep>
			<div class="step-container fade-in">
				<div>
					<h4>Create a character</h4>
					<div class="character-details-container">
						<ul>
							<li><span>Release:</span><span>{selectedRelease.name}</span></li>
							<li><span>ID:</span><span>{selectedRelease.slug}</span></li>
							<li><span>Price:</span><span>$20 USD</span></li>
							<!-- <li><label>Release:</label><span>DCS1R1</span></li> -->
						</ul>
					</div>
					<hr />
					<h4>Enter Payment Details</h4>
					<StripePayment
						bind:this={stripe}
						callback={nextStep}
						{metadata}
						bind:processing
					/>
					<blockquote class="text-warning">
						<h4>You will be charged for your character when you press continue.</h4>
						<p>Once your payment has been processed, character creation will begin...</p>
					</blockquote>
					{#if processing}
						<LoadingIndicator>Processing payment...</LoadingIndicator>
					{/if}
				</div>
				<div class="button-row">
					<button data-augmented-ui class="aug-button" on:click={previousStep}>go back</button>
					<button
						data-augmented-ui
						class="aug-button"
						disabled={processing}
						on:click={stripe.process}
					>
						{#if processing}
							processing...
						{:else}
							continue
						{/if}
					</button>
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
						<h2>Sporo Generated</h2>

						<p>
							Click the <strong>complete</strong> button to complete their citizen file in your Dimm
							City Archive.
						</p>

						<p>
							Please note that submitting this information to the Dimm City Archive will make it
							freely available to the public. All information submitted to the archive will be
							considered to be available on the CC-BY license unless otherwise stated. Contact the
							founders if you would like more information.
						</p>
						{#if isSaving}
							<LoadingIndicator><div class="centered-container">compiling...</div></LoadingIndicator
							>
						{/if}
					</div>
				</div>
				<div class="button-row">
					<!-- <Button on:click={previousStep}>Back</Button> -->
					<!-- <Button on:click={cancel}>skip</Button> -->
					<!-- <Button on:click={() => }>Complete</Button> -->
					<Button url="/console">Return to Op Console</Button>
					<!-- <Button url={'/console/characters/import/' + token.tokenId}>Create Citizen File</Button> -->
				</div>
			</div>
		</StepWizard.Step>
		<!-- <StepWizard.Step num={3} let:nextStep let:previousStep>
			<div class="step-container fade-in">
				<div>
					<h2>Profile Submitted</h2>
				</div>
				<div class="button-row">
					<Button url={'/citizens/' + selectedRelease.slug + '-' + character.tokenId}>View Citizen File</Button>
					<Button url="/console">Return to Op Console</Button>
				</div>
			</div>
		</StepWizard.Step> -->
	</StepWizard>
</LoggedInContainer>

<style>
	.step-container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 0.1fr;
		padding: 1rem 0;
	}
	.step-container.release-step {
		grid-template-rows: min-content auto min-content;
	}

	.character-details-container span:nth-child(odd) {
		padding-right: 1rem;
	}
	.character-details-container span:nth-child(even) {
		text-transform: uppercase;
	}
	.character-details-container ul {
		padding-inline-start: 0px;
	}

	.selected {
		color: var(--fourth-accent);
	}

	.step-container div:nth-child(1) {
		min-height: max-content;
		height: 100%;
		width: 100%;
		justify-content: space-between;
		/* overflow-y: auto; */
	}
	.button-row {
		display: flex;
		justify-content: space-between;
	}
	.step-container div:nth-child(1) .centered-container {
		height: fit-content;
	}
</style>
