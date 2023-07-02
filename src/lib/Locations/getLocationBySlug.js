import { Location } from './Location';
import { config } from '$lib/Shared/config';

const getLocationBySlugQuery = `
  query getCharacterBySlug($slug: String!) {
    locations(filters: { slug: { eq: $slug } }) {      
      data {
        id
        attributes {
          slug
          name
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

export function getLocation(slug){
	let location = new Location();
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getLocationBySlugQuery,
			variables: { slug }
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();
				console.log('data', slug, json);

				location =
					json.data.locations.data && json.data.locations.data.length > 0
						? {
								id: json.data.locations.data[0].id,
								...json.data.locations.data[0].attributes,
								loaded: true
						  }
						: null;

				if (location != null) {
					if (location.imageUrl == null || location.imageUrl.length === 0)
						location.imageUrl = '/assets/missing-image.png';
					if (location.thumbnailUrl == null || location.thumbnailUrl.length === 0)
						location.thumbnailUrl = '/assets/missing-image.png';
				} else {
					location = new Location();
					location.name = 'Not found';
				}
				return location;
			}
			return new Location();
		})
		.catch((reason) => {
			console.log('getLocation failed', reason);
			return new Location();
		});
}
