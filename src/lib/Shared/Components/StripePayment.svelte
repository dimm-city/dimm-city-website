<script lang="ts">
	import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js';
	import {
		Elements,
		PaymentElement
	} from 'svelte-stripe';
	import { onMount } from 'svelte';
	import { config } from '../config';
	import { jwt } from '../Stores/UserStore';
	import { get } from 'svelte/store';
	export let callback: Function;
	export let metadata: any;
	export const process = submit;
	let stripe: Stripe | null = null;
	let clientSecret: string | null = null;
	let error = null;
	let elements: StripeElements | undefined;
	let elementVars = {
		colorPrimary: '#ef1ebf',
		colorBackground: '#111111',
		colorText: '#ef1ebf',
		colorDanger: '#f8f400da',
		fontFamily: 'dimm-city, Tomorrow, Droid Sans Mono, Comfortaa, Segoe UI, Roboto',
		spacingUnit: '0.23rem',
		borderRadius: '4px'
		// See all possible variables below
	};
	export let processing = false;
	onMount(async () => {
		stripe = await loadStripe(config.stripePublicKey, {});
		clientSecret = await createPaymentIntent();
	});

	async function createPaymentIntent() {
		const response = await fetch(config.apiBaseUrl + '/payments/begin', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${get(jwt)}`
			},
			body: JSON.stringify({
				metadata
			})
		});
		const { clientSecret } = await response.json();
		return clientSecret;
	}
	async function submit() {
		if (!elements || !stripe) return;

		if (processing) return;
		processing = true;

		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		//console.log({ result });
		if (result.error) {
			// payment failed, notify user
			error = result.error;
			callback(error);
		} else {
			callback(result);
		}
		processing = false;
	}
</script>

{#if stripe && clientSecret}
	<form on:submit|preventDefault={() => submit()} class="payment-form">
		<Elements
			{stripe}
			{clientSecret}
			bind:elements
			theme="flat"
			labels="floating"
			variables={elementVars}
		>
			<PaymentElement />
		</Elements>
	</form>
{/if}

<style>
	:global(.StripeElement, .__PrivateStripeElement) {
		overflow: hidden !important;
		padding: 0rem;
		margin: 0rem;
	}
</style>
