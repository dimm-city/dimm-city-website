import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

// initialize Stripe
// @ts-ignore
const stripe = new Stripe(SECRET_STRIPE_KEY);

// handle POST /create-payment-intent
export async function POST({ request }) {
	const { metadata } = await request.json();
	// create the payment intent
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 2000,
		currency: 'usd',
		payment_method_types: ["card"],
		// automatic_payment_methods: {
		// 	enabled: true
		// },
		metadata: {
			slug: metadata.slug
		}
	});

	// return the clientSecret to the client
	return json({clientSecret: paymentIntent.client_secret});
}
