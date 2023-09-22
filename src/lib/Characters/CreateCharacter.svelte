<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import StepWizard from 'svelte-step-wizard';
	import Select from 'svelte-select';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import { getCharacterReleases } from '$lib/Shared/Stores/getCharacterReleases';
	import { onMount } from 'svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import StripePayment from '$lib/Shared/Components/StripePayment.svelte';
	import Article from '$lib/Shared/Components/Article.svelte';
	import { loadWallets, user } from '$lib/Shared/Stores/UserStore';
	import { createCharacter } from './Queries/CharacterStore';
	import ProfileImage from './Components/ProfileImage.svelte';

	const { addNotification } = getNotificationsContext();
	let logs = [''];
	$: filteredLogs = logs.slice(-3);

	/**
	 * @type {StripePayment}
	 */
	let stripe;
	let processing = false;
	let isSaving = false;
	let character = {
		name: '',
		tokenId: ''
	};
	/**
	 * @type {DC.CharacterRelease}
	 */
	let selectedRelease; 

	let currentStep = 3;
	let metadata = {
		slug: '',
		user: $user?.id
	};

	$: if (selectedRelease) {
		metadata = {
			slug: selectedRelease.attributes.slug,
			user: $user?.id
		};
	}
	onMount(async () => {
		const data = await getCharacterReleases();
	});

	function itemSelected(params) {
		//logs = [...logs, `${params.detail.name} was selected`];
	}
	function cancel() {
		if (window.history.length > 0) window.history.back();
		else window.location.href = '/console';
	}

	async function processPayment(nextStep) {
		if (selectedRelease) {
			isSaving = true;
			metadata = {
				slug: selectedRelease?.attributes.slug,
				user: $user?.id
			};

			try {
				await stripe.process();
				//nextStep();
			} catch (error) {
				console.error('Failed to process payment:', error);
				addNotification({
					id: `${new Date().getTime()}-${Math.floor(Math.random() * 9999)}`,
					position: 'bottom-right',
					heading: 'issue with payment',
					type: 'error',
					description: 'failed to process payment'
				});
			}
		}
	}
	/**
	 * @param {CustomEvent<any>} result
	 * @param {() => void} nextStep
	 * @param {() => void} previousStep
	 */
	async function onPaymentProcessed(result, nextStep, previousStep) {
		addNotification({
			id: `${new Date().getTime()}-${Math.floor(Math.random() * 9999)}`,
			position: 'bottom-right',
			heading: 'establishing connection',
			type: 'success',
			removeAfter: 3000,
			text: 'connecting your sporo to you op console...'
		});

		if (currentStep == 3) nextStep();

		const waitingTimer = setInterval(() => {
			addNotification({
				id: `${new Date().getTime()}-${Math.floor(Math.random() * 9999)}`,
				position: 'bottom-right',
				heading: 'still working',
				type: 'warning',
				removeAfter: 3000,
				text: 'it is taking some time the founders are hard at work connecting to your sporo'
			});
		}, 10000);

		try {
			const response = await createCharacter(result.detail.paymentIntent.id);

			loadWallets(true);

			character = {
				tokenId: response.token.slug,
				name: response.token.metadata.name,
				imageUrl: response.token.metadata.image
			};
			clearInterval(waitingTimer);
			nextStep();
		} catch (error) {
			addNotification({
				id: `${new Date().getTime()}-${Math.floor(Math.random() * 9999)}`,
				position: 'bottom-right',
				heading: 'connection error',
				type: 'error',
				removeAfter: 3000,
				text: error
			});
			if (currentStep == 3) previousStep();
		}

		isSaving = false;

		//if (currentStep == 3) nextStep();
	}
	async function onPaymentFailed(result, previousStep) {
		// logs.push('payment failed');
		// logs.push(result.detail.message);
		// logs = [...logs];

		addNotification({
			position: 'bottom-right',
			removeAfter: 3000,
			allowRemove: true,
			id: `${new Date().getTime()}-${Math.floor(Math.random() * 9999)}`,
			heading: 'payment failed',
			type: 'error',
			text: result.detail.message
		});
		isSaving = false;

		// if (currentStep == 3) previousStep();
	}
</script>

<LoggedInContainer>
	<div class="status text-warning" data-augmented-ui="border">
		{#each filteredLogs as log}
			<div class="fade-in">{log}</div>
		{/each}
	</div>
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
							on:change={itemSelected}
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
								<span />
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
									>{selectedRelease.contract?.totalSupply}/{selectedRelease.contract?.maxSupply ??
										'unknown'} connection established</span
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
						on:stripe.onPaymentIntentCreated={(data) => console.log('intent created', data)}
						on:stripe.onPaymentConfirmed={(data) =>
							onPaymentProcessed(data, nextStep, previousStep)}
						on:stripe.onPaymentFailed={(data) => onPaymentFailed(data, previousStep)}
						{metadata}
						bind:processing
					/>
					<div class="text-warning">
						<h4>You will be charged for your character when you press continue.</h4>
						<p>
							Once your payment has been processed, a connection will be established to your
							sporo...
						</p>
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
			<div class="character-created step-container fade-in">
				<div class="step-container-header">
					<h2>Connection established!</h2>
				</div>
				<div class="step-container-content centered-container h-100">
					<div class="character-created-container">
						{#if character?.name > ''}
							<h3>{character.name}</h3>
							<ProfileImage {character} />
							<!-- <p>
								Click the <strong>view citizen file</strong> button to edit their citizen file
							</p> -->

							<small>
								You may now edit your sporo's citizen file and begin providing their backstory,
								specialties, and more! You the 'edit citizen file' button below to get started.
							</small>
						{/if}
						{#if isSaving}
							<LoadingIndicator
								><div class="centered-container">connecting...</div></LoadingIndicator
							>
						{/if}
					</div>
				</div>
				<div class="character-created button-row">
					<!-- <Button on:click={previousStep}>Back</Button> -->
					<!-- <Button on:click={cancel}>skip</Button> -->
					<!-- <Button on:click={() => }>Complete</Button> -->
					<a class="aug-button" data-augmented-ui href="/console">Return to Op Console</a>
					<a class="aug-button" data-augmented-ui href={'/citizens/' + character.tokenId}
						>Edit Citizen File</a
					>
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
	h2 {
		font-size: max(1rem, min(1.5vw, 2.5rem));
	}
	p {
		font-size: max(0.8rem, min(1.5vw, 1.25rem));
	}
	:global(.aug-select) {
		--multi-item-clear-icon-color: var(--pink);
		--multi-item-outline: 1px solid var(--pink);
		--clear-select-color: var(--pink);
		--list-z-index: 999;
	}
	.status {
		position: fixed;
		display: grid;
		width: 100%;
		padding-inline: 20%;
		left: 0;
		/* top: 50%;  */
		/* left: 50%; */
		/* margin: auto;*/
		justify-content: center;
		pointer-events: none;
		bottom: 0.17rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--dark);
		--aug-all-width: max(5vh, 2vw);
		--aug-inlay-bg: var(--pink);
		transition: all 300ms ease-in-out;
	}
	.step-container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		/* grid-template-rows: auto 0.1fr; */
		grid-template-rows: min-content min(90%, auto) min-content;
		padding: 2rem 0.5rem;
	}

	.step-container {
		margin: auto;
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
		overflow: hidden;
		/* justify-content: space-between; */
		/* overflow-y: auto; */
	}
	.step-container-content {
		width: 100%;
		overflow: hidden;
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
		height: min-content;
		display: flex;
		justify-content: space-between;
		align-self: flex-end;
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
		display: grid;
		row-gap: 0.5rem;
		align-content: space-around;
	}
	.character-created .step-container-header {
		text-align: center;
	}
	.character-created small {
		max-width: 60ch;
		margin-block: 1rem;
	}
	/* .step-container div:nth-child(1) .centered-container {
		height: fit-content;
	} */

	:global(.Input, .Input--invalid, .p-Input-input.Input.p-CardNumberInput-input) {
		padding: 0;
		box-shadow: 0;
	}

	@media (max-width: 500px) {
		.step-container {
			padding: 0.5rem;
			justify-content: center;
		}

		.release-step {
			padding-top: 1.25rem;
		}
		/* .release-container {
			--dc-image-width: 80svw;
			--dc-image-aspect-ratio: 9/16;
		} */

		.button-row {
			display: flex;
			gap: 1rem;
			justify-content: flex-start;
			align-items: start;
		}

		.character-created.button-row {
			margin-top: 1.5rem;
			flex-direction: column;
		}
	}
</style>
