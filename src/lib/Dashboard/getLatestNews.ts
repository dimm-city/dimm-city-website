
import type { ISummaryItem } from '$lib/Shared/ISummaryItem';
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

export async function getLatestNews() : Promise<ISummaryItem[]> {
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
						imageUrl: i.attributes.imageUrl,
						recordedAt: i.attributes.recordedAt
					};
				}).sort((a,b) => a.recordedAt < b.recordedAt ? 1 : -1);
			}
			return [];
		})
		.catch((reason) => {
			console.log('getJournalEntries failed', reason);
		});
}