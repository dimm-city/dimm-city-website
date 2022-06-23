
import type { ISummaryItem } from '$lib/ISummaryItem';
import { config } from '../config';
export const getJournalEntriesQuery = `
query {
	journalEntries {
		data {
			id
			attributes {
				slug
				title
				description
				shortDescription
				imageUrl
			}
		}
	}
}`;

export async function getJournalEntries() : Promise<ISummaryItem[]> {
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getJournalEntriesQuery
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();

				return json.data.journalEntries.data.map((i) => {
					return {
						id: i.id,
						slug: i.attributes.slug,
						name: i.attributes.title,
						description: i.attributes.shortDescription ?? 'no information on this subject...',
						thumbnailUrl: i.attributes.thumbnailUrl,
						imageUrl: i.attributes.imageUrl
					};
				}).sort((a,b) => a.name > b.name ? 1 : -1);
			}
			return [];
		})
		.catch((reason) => {
			console.log('getJournalEntries failed', reason);
		});
}