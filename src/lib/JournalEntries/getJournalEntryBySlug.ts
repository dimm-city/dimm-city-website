import { JournalEntry } from './JournalEntry';
import { config } from '$lib/Shared/config';

const getJournalEntryBySlugQuery = `
  query getJournalEntryBySlug($slug: String!) {
    journalEntries(filters: { slug: { eq: $slug } }) {      
      data {
        id
        attributes {
          slug
          name: title
          description
          shortDescription
          imageUrl
          thumbnailUrl
          videoUrl
        }
      }
    }
  }
`;

export function getJournalEntry(slug): Promise<JournalEntry> {
	let journalEntry = new JournalEntry();
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getJournalEntryBySlugQuery,
			variables: { slug }
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();
				console.log('data', slug, json);

				journalEntry =
					json.data.journalEntries.data && json.data.journalEntries.data.length > 0
						? {
								id: json.data.journalEntries.data[0].id,
								...json.data.journalEntries.data[0].attributes,
								loaded: true
						  }
						: null;

				if (journalEntry != null) {
					// if (journalEntry.imageUrl == null || journalEntry.imageUrl.length === 0)
					// 	journalEntry.imageUrl = '/assets/missing-image.png';
					// if (journalEntry.thumbnailUrl == null || journalEntry.thumbnailUrl.length === 0)
					// 	journalEntry.thumbnailUrl = '/assets/missing-image.png';
				} else {
					journalEntry = new JournalEntry();
					journalEntry.name = 'Not found';
				}
				return journalEntry;
			}
			return new JournalEntry();
		})
		.catch((reason) => {
			console.log('getJournalEntry failed', reason);
			return new JournalEntry();
		});
}
