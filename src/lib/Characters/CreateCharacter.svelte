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
	import Select from 'svelte-select/Select.svelte';

	let stripe: StripePayment;
	let processing = false;
	let isSaving = false;
	let character: ICharacter = {
		name: 'test',
		tokenId: 'dcta-23'
	};
	let releases: ICharacterRelease[] = [];
	let selectedRelease: ICharacterRelease | null = null; //new CharacterRelease();

	let currentStep = 3;
	let metadata = {
		slug: selectedRelease?.slug,
		user: $profile?.id
	};

	$: {
		metadata = {
			slug: selectedRelease?.slug,
			user: $profile?.id
		};
	}
	onMount(async () => {
		const data = await getCharacterReleases();
		releases = data;
		// selectedRelease = releases?.at(0) ?? new CharacterRelease();
	});

	function cancel() {
		if (window.history.length > 0) window.history.back();
		else window.location.href = '/console';
	}

	async function processPayment(nextStep: Function) {
		if (selectedRelease) {
			isSaving = true;
			metadata = {
				slug: selectedRelease?.slug,
				user: $profile?.id
			};

			await stripe.process();
			nextStep();
		}
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

		isSaving = false;

		if (currentStep == 3) nextStep();
	}
</script>

<LoggedInContainer>
	<StepWizard initialStep={1} step={currentStep}>
		<StepWizard.Step num={1} let:previousStep let:nextStep>
			<div class="step-container release-step fade-in">
				<div class="step-container-header">
					<!-- <h4>Select which collection you would like to create a character from</h4> -->
					<div class="toolbar aug-select">
						<Select
							loadOptions={getCharacterReleases}
							placeholder="Select a character collection"
							label="name"
							itemId="id"
							bind:value={selectedRelease}
						>
							<div slot="selection" let:selection>
								<i class={selection.icon} /><span>{selection.name ?? 'Unknown'}</span><span
									class="release-token-summary"
									>&nbsp; ({selection.contract?.totalSupply}/{selection.contract?.maxSupply ??
										'Unknown'} sporos)</span
								>
							</div>
							<div slot="item" let:item let:index>
								<i class={item.icon} /><span>{item.name ?? 'Unknown'}</span><span
									class="release-token-summary"
									>&nbsp; ({item.contract?.totalSupply}/{item.contract?.maxSupply ?? 'Unknown'} sporos)</span
								>
							</div>
						</Select>
					</div>
				</div>
				<div class="step-container-content">
					<div class="release-container">
						<Article model={selectedRelease}>
							<svelte:fragment slot="header">
								<span></span>
							</svelte:fragment>
						</Article>
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
							<li><span>Price:</span><span>${selectedRelease.contract?.price} USD</span></li>
							<!-- <li><label>Release:</label><span>DCS1R1</span></li> -->
						</ul>
						<small>
							{#if selectedRelease?.id > 0}
								<span
									>{selectedRelease.contract?.totalSupply}/{selectedRelease.contract?.maxSupply} sporos
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
					<div class="text-warning">
						<h4>You will be charged for your character when you press continue.</h4>
						<p>Once your payment has been processed, character creation will begin...</p>
					</div>
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
			<div class="video-container">
				<!-- svelte-ignore a11y-media-has-caption -->
				<video class="video" autoplay loop>
					<!-- <source src="small.mp4" type="video/mp4" media="(max-width: 480px)"> -->
					<source src="https://files.dimm.city/stories/prologue-1/scene-4.mp4" type="video/mp4" />
				</video>
			</div>
		</StepWizard.Step>
		<StepWizard.Step num={4} let:previousStep let:nextStep>
			<div class="step-container fade-in">
				<div class="centered-container h-100">
					<div class="character-created-container">
						{#if character?.name > ''}
							<h2>Your Sporo has been generated!</h2>
							<h3>{character.name}</h3>
							<Image imageUrl={character.imageUrl} title="character image" />
							<p>
								Click the <strong>view citizen file</strong> button to edit their citizen file
							</p>

							<!-- <p>
							Please note that submitting this information to the Dimm City Archive will make it
							freely available to the public. All information submitted to the archive will be
							considered to be available on the CC-BY license unless otherwise stated. Contact the
							founders if you would like more information.
						</p> -->
						{/if}
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
	:root {
		--focusBoxShadow: 0;
	}
	:global(.aug-select) {
		--multi-item-clear-icon-color: var(--pink);
		--multi-item-outline: 1px solid var(--pink);
		--clear-select-color: var(--pink);
		--list-z-index: 999;
	}
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

	.release-token-summary {
		font-size: 0.75rem;
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
	.release-container {
		--dc-image-aspect-ratio: 3/4;
	}
	.video-container {
		--dc-image-aspect-ratio: 16/9;
		--dc-image-height: auto;
		--dc-image-width: 100%;
	}
	.video {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		min-height: 100%;
		min-width: 100%;
		width: auto;
		height: auto;
		object-fit: cover;
	}
	.character-created-container {
		--dc-image-height: 400px;
		--dc-image-width: auto;
		--dc-image-aspect-ratio: 3/4;

		text-align: center;
	}
	/* .step-container div:nth-child(1) .centered-container {
		height: fit-content;
	} */

	:global(.Input, .Input--invalid, .p-Input-input.Input.p-CardNumberInput-input) {
		padding: 0;
		box-shadow: 0;
	}

	@media (max-width: 500px) {
		.step-container{
			padding: .5rem;
		}
		.button-row {
			display: flex;
			justify-content: space-around;
		}
		.aug-button {
			width: auto;
		}
	}
</style>
