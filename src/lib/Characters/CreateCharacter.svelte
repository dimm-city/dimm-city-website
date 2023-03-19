<script lang="ts">
	import StepWizard from 'svelte-step-wizard';
	import Button from '$lib/Shared/Components/Button.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import { CharacterRelease, type ICharacterRelease } from './Models/ICharacterRelease';
	import { getCharacterReleases } from './Queries/getCharacterReleases';
	import { onMount } from 'svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import type { ICharacter, IToken } from './Models/Character';
	import StripePayment from '$lib/Shared/Components/StripePayment.svelte';
	import Article from '$lib/Shared/Components/Article.svelte';
	import Toolbar from '$lib/Shared/Components/Toolbar.svelte';
	import { loadWallets, profile } from '$lib/Shared/Stores/UserStore';
	import { loadCharacter } from './Queries/getCharacterBySlug';
	import { createCharacter } from './Queries/createCharacter';
	import Image from '$lib/Shared/Components/Image.svelte';
	import ProfileImage from './Components/ProfileImage.svelte';

	let stripe: StripePayment;
	let processing = false;
	let isSaving = false;
	let character: ICharacter;
	let releases: ICharacterRelease[] = [];
	let selectedRelease: ICharacterRelease = new CharacterRelease();

	let metadata = {
		slug: selectedRelease.slug,
		user: $profile?.id
	};
	$: {
		metadata = {
			slug: selectedRelease.slug,
			user: $profile?.id
		};
	}
	onMount(async () => {
		const data = await getCharacterReleases();
		releases = data;
		selectedRelease = releases?.at(0) ?? new CharacterRelease();
	});

	function cancel() {
		if (window.history.length > 0) window.history.back();
		else window.location.href = '/console';
	}

	async function processPayment(nextStep: Function) {
		metadata = {
			slug: selectedRelease.slug,
			user: $profile?.id
		};

		await stripe.process();
		nextStep();
	}
	async function onPaymentProcessed(result: any, nextStep: Function, previousStep: Function) {
		console.log('onPP', result);

		if (result.paymentIntent.status != 'succeeded') previousStep();

		const response = await createCharacter(result.paymentIntent.id);

		loadWallets(true);

		character = {
			tokenId: response.token.slug,
			name: response.token.metadata.name,
			imageUrl: response.token.metadata.image
		};

		nextStep();
	}
</script>

<LoggedInContainer>
	<StepWizard initialStep={1}>
		<StepWizard.Step num={1} let:previousStep let:nextStep>
			<div class="step-container release-step  fade-in">
				<div class="step-container-header">
					<h4>Select which collection you would like to create a character from</h4>
					<div class="toolbar">
						{#each releases as release}
							<button
								class="aug-button hex"
								class:selected={selectedRelease == release}
								data-augmented-ui
								on:click={() => (selectedRelease = release)}
								><i class={release.icon} /><span>{release.name}</span></button
							>
						{/each}
					</div>
					<small>
						{#if selectedRelease?.id > 0}
							<span
								>{selectedRelease.contract.totalSupply}/{selectedRelease.contract.maxSupply} sporos created
								in this release</span
							>
						{/if}
					</small>
				</div>
				<div class="step-container-content">
					<div>
						<Article model={selectedRelease} imageHeight="200px" />
					</div>
				</div>
				<div class="button-row">
					<button data-augmented-ui class="aug-button" on:click={cancel}>cancel</button>
					<button data-augmented-ui class="aug-button" on:click={nextStep}>continue</button>
				</div>
			</div>
		</StepWizard.Step>
		<StepWizard.Step class="Step" num={2} let:previousStep let:nextStep>
			<div class="step-container fade-in">
				<div class="step-container-header">
					<h4>Create a character</h4>
					<div class="character-details-container">
						<ul>
							<li><span>Release:</span><span>{selectedRelease.name}</span></li>
							<li><span>ID:</span><span>{selectedRelease.slug}</span></li>
							<li><span>Price:</span><span>${selectedRelease.contract.price} USD</span></li>
							<!-- <li><label>Release:</label><span>DCS1R1</span></li> -->
						</ul>
						<small>
							{#if selectedRelease?.id > 0}
								<span
									>{selectedRelease.contract.totalSupply}/{selectedRelease.contract.maxSupply} sporos
									created in this release</span
								>
							{/if}
						</small>
					</div>
				</div>
				<div class="step-container-content">
					<hr />
					<h4>Enter Payment Details</h4>
					<StripePayment
						bind:this={stripe}
						callback={(data) => onPaymentProcessed(data, nextStep, previousStep)}
						{metadata}
						bind:processing
					/>
					<blockquote class="text-warning">
						<h4>You will be charged for your character when you press continue.</h4>
						<p>Once your payment has been processed, character creation will begin...</p>
					</blockquote>
					{#if processing}
						<div class="padding-1">
							<LoadingIndicator>processing...</LoadingIndicator>
						</div>
					{/if}
				</div>
				<div class="button-row">
					<button data-augmented-ui class="aug-button" on:click={previousStep}>go back</button>
					<button
						data-augmented-ui
						class="aug-button"
						disabled={processing}
						on:click={() => processPayment(nextStep)}
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
		<StepWizard.Step num={3} let:previousStep let:nextStep>
			<h2>Generating sporo...</h2>
			<Image videoUrl="https://files.dimm.city/assets/connecting.mp4" width="100%" />
		</StepWizard.Step>
		<StepWizard.Step num={4} let:previousStep let:nextStep>
			<div class="step-container fade-in">
				<div class="centered-container h-100">
					<div class="">
						<h2>Sporo Generated</h2>
						<h3>{character.name}</h3>
						<Image imageUrl={character.imageUrl} title="character image" />
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
					<Button url={'/citizens/' + character.tokenId}>View Citizen File</Button>
					<!-- <Button url={'/console/characters/import/' + token.tokenId}>Create Citizen File</Button> -->
				</div>
			</div>
		</StepWizard.Step>
	</StepWizard>
</LoggedInContainer>

<style>
	.step-container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		/* grid-template-rows: auto 0.1fr; */
		grid-template-rows: min-content auto min-content;
		padding: 1rem 0;
	}
	/* .step-container.release-step {
		grid-template-rows: min-content auto min-content;
	} */

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

	.step-container-header {
		min-height: max-content;
		height: 100%;
		width: 100%;
		/* justify-content: space-between; */
		/* overflow-y: auto; */
	}
	.step-container-content {
		width: 100%;
	}
	.toolbar {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		margin-block: 0.25rem;
	}
	.toolbar i {
		margin-right: 0.5rem;
	}
	.button-row {
		display: flex;
		justify-content: space-between;
	}

	/* .step-container div:nth-child(1) .centered-container {
		height: fit-content;
	} */
</style>
