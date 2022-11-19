<script lang="ts">
	import { myCollection, districts } from '$lib/Shared/ShellStore';
	import StepWizard from 'svelte-step-wizard';
	import type { IToken } from './Character';
	import CharacterBiography from './Tabs/CharacterBiography.svelte';
	import Button from '$lib/Components/Button.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import { connect, loggedIn, sessionToken } from '$lib/Shared/ChainStore';
	import { config } from '$lib/Shared/config';
	import type { ISummaryItem } from '$lib/Shared/ISummaryItem';
	import Article from '$lib/Components/Article.svelte';
	import type { IArticle } from '$lib/Shared/IArticle';
	import ReleaseSelector from './Components/ReleaseSelector.svelte';
	import type { ICharacterRelease } from './Components/IArticle';
	import { defaultEvmStores, contracts } from 'svelte-ethers-store';

	// ...

	let isSaving = false;

	let token: IToken;

	let contractConfig = config.releases.dcs1r1.networks.find((n) => n.chainId == 16);

	let selectedRelease: ICharacterRelease = {
		name: '',
		id: 0,
		slug: '',
		description: '',
		imageUrl: '',
		videoUrl: '',
		thumbnailUrl: '',
		tags: '',
		author: '',
		config: {}
	};

	let totalSupply;
	$: if (selectedRelease?.id > 0) {
		// console.log(
		// 	'chain',
		// 	$chainData,
		// 	allChainsData.filter((c) => c.name.includes('Av'))
		// );
		defaultEvmStores.attachContract('selectedContract', selectedRelease.config.address, selectedRelease.config.abi);
		if ($contracts.selectedContract) totalSupply = $contracts.selectedContract.totalSupply();
		else console.log('no contract', $contracts.selectedContract);
	}

	function cancel() {
		if (window.history.length > 0) window.history.back();
		else window.location.href = '/console';
	}

	function createCharacter(cb) {
		console.log('creating...');
		cb();
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
				<h3>Which collection?</h3>

				<ReleaseSelector bind:selectedRelease />
				<div>
					{#if selectedRelease?.id > 0}
						{#await totalSupply}
							<span>searching...</span>
						{:then value}
							<span>{value} sporos created in this release</span>
						{/await}
					{/if}
				</div>
				<Article model={selectedRelease} imageHeight="300px" />
			</div>
			<div class="button-row">
				<Button on:click={cancel}>cancel</Button>
				<Button on:click={nextStep}>continue</Button>
			</div>
		</div>
	</StepWizard.Step>
	<StepWizard.Step num={2} let:previousStep let:nextStep>
		<div class="step-container fade-in">
			<div>
				<h3>{selectedRelease.name}</h3>
			</div>
			<div class="button-row">
				<Button on:click={previousStep}>Back</Button>
				<Button on:click={cancel}>cancel</Button>
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
				<Button on:click={cancel}>cancel</Button>
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
			</div>
		</div>
	</StepWizard.Step>
</StepWizard>
