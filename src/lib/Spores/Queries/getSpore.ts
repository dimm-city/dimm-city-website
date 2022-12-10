import type { Spore } from '../Spore';
// import { getSpores } from './getSpores';

// export async function getSpore(slug: string): Promise<Spore> {
// 	const spores = await getSpores();
// 	return spores.find((s) => s.slug === slug);
// }

import { config } from '$lib/Shared/config';
export const x = `query getSpore($slug: String!) {
    spores(filters: { slug: { eq: $slug } }) { 
      data {
        id
        attributes {
          slug
          name
          subtitle
          description
          introduction
          imageUrl
          thumbnailUrl
          customCss
          villains{
            value
          }
          plots{
            value
          }
          goals{
            value
          }
          twists{
            value
          }
        }
			}
	}
}`;

export async function getSpore(slug: string): Promise<Spore> {
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: x,
			variables: { slug }
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();

				const output = json.data.spores.data
					.map((i) => {
						const item: any = {
							...i.attributes
						};
						item.villains = i.attributes.villains.map((v) => v.value) ?? [];
						item.plots = i.attributes.plots.map((v) => v.value) ?? [];
						item.goals = i.attributes.goals.map((v) => v.value) ?? [];
						item.twists = i.attributes.twists.map((v) => v.value) ?? [];
						return item;
					})
					.sort((a, b) => (a.name > b.name ? 1 : -1));
                    
				return output.at(0);
			}
			return [];
		})
		.catch((reason) => {
			console.log('getSpore failed', reason);
		});
}
