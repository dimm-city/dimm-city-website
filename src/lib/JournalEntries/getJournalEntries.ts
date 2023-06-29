
import type { ISummaryItem } from '$lib/Shared/Models/ISummaryItem';
import { config } from '$lib/Shared/config';
export const getJournalEntriesQuery = `
query {
	journalEntries {
		data {
			id
			attributes {
				slug
				tags
				title
				description
				shortDescription
				imageUrl
				publishedAt
				recordedAt
			}
		}
	}
}`;

export async function getJournalEntries(searchText = "") : Promise<ISummaryItem[]> {
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
					const item = {
						id: i.id,
						slug: i.attributes.slug,
						name: i.attributes.title,
						description: i.attributes.shortDescription ?? 'no information on this subject...',
						thumbnailUrl: i.attributes.thumbnailUrl,
						imageUrl: i.attributes.imageUrl,
						recordedAt: i.attributes.recordedAt,
						type: 'journalEntry',
						tags: [''],
						url: `/archive/journal-entries/${i.attributes.slug}`

					};
					if (i.attributes.tags) {
						item.tags =  [...i.attributes.tags];
					}
					if(!item.tags.includes('journalEntry')) item.tags.push('journalEntry');
					
					return item;
				}

				).sort((a,b) => a.name > b.name ? 1 : -1);
			}
			return [];
		})
		.catch((reason) => {
			console.log('getJournalEntries failed', reason);
		});
}