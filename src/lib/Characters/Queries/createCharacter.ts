import { config } from '$lib/Shared/config';
import { get } from 'svelte/store';
import { jwt } from '$lib/Shared/Stores/UserStore';


export async function createCharacter(paymentId: string) : Promise<any> {
	return fetch(`${config.apiBaseUrl}/payments/purchased/${paymentId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${get(jwt)}`,
				'Content-Type': 'application/json'
			},
			body: ""
		})
		.then(async (res) => {
			const data = await res.json();
			if (res.ok) {

				console.log('createCharacter response', data);
				console.assert(data != null);
				
				return data;

			} else {
				//TODO: display error
				console.log('failed', data);
				return null;
			}
		})
		.catch((reason) => {
			console.log('could not create character', reason);
			return null;
		});
}
