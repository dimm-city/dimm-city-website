import { Specialty } from './Specialty';
import { config } from '$lib/Shared/config';

const getSpecialtyBySlugQuery = `
  query getSpecialtyBySlug($slug: String!) {
    specialties(filters: { slug: { eq: $slug } }) {      
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

export function getSpecialty(slug): Promise<Specialty> {
	let specialty = new Specialty();
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getSpecialtyBySlugQuery,
			variables: { slug }
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();
				console.log('data', slug, json);

				specialty =
					json.data.specialties.data && json.data.specialties.data.length > 0
						? {
								id: json.data.specialties.data[0].id,
								...json.data.specialties.data[0].attributes,
								loaded: true
						  }
						: null;

				if (specialty != null) {
					if (specialty.imageUrl == null || specialty.imageUrl.length === 0)
						specialty.imageUrl = '/assets/missing-image.png';
					if (specialty.thumbnailUrl == null || specialty.thumbnailUrl.length === 0)
						specialty.thumbnailUrl = '/assets/missing-image.png';
				} else {
					specialty = new Specialty();
					specialty.name = 'Not found';
				}
				return specialty;
			}
			return new Specialty();
		})
		.catch((reason) => {
			console.log('getSpecialty failed', reason);
			return new Specialty();
		});
}
