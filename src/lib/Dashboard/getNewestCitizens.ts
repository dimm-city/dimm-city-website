import { config } from '$lib/Shared/config';

export const getCharactersQuery = `
query {
    characters(pagination: { page: 1, pageSize: 10 }){
     data{
       id
       attributes{
         tokenId
         name
         race {
          data {
            attributes {
              name
              slug
              abilities{
                data{
                  id
                  attributes{
                    name
                    slug
                    description
                    ap
                    rollDice     
                  }
                }
              }
            }
          }
        }
        specialties {
          data {
               attributes{
                   name
              }
          }
        }
       }
     }
   } 
}
`;

export function getLatestCitizens() {
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getCharactersQuery
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();

				return json.data.characters.data
					.map((c) => {
						const x = { ...c.attributes };
						x.id = c.id;
						return x;
					})
					.sort((a, b) => {
						if (a.name > b.name) return 1;
						else return -1;
					});
			}
			return {};
		})
		.catch((reason) => {
			console.log('loadCharacters failed', reason);
		});
}
