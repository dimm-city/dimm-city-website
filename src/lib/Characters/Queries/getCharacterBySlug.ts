import { Character, Token } from '$lib/Characters/Models/Character';
import { config } from '$lib/Shared/config';

export const getCharacterBySlugQuery = `
  query getCharacterBySlug($tokenId: String!) {
    characters(filters: { tokenId: { eq: $tokenId } }) {      
      data {
        id
        attributes {
          tokenId
          token{
            data{
              id
              attributes{
                tokenId
                contract{
                  data{
                    attributes{
                      slug
                    }
                  }
                }
              }
            }
          }
          name
          playerUpdated
          hp
          ap
          age
          height
          weight
          pronouns
          eyes
          skin
          hair
          vibe
          beliefs
          flaws
          dreams
          backstory
          clothing
          imageUrl
          thumbnailUrl
          cybernetics{
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
              id
              attributes {
                name
                slug
              }
            }
          }         
          currentLocation {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
          originLocation {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
          selectedAbilities {
            data {
              id
              attributes {
                name
                slug
                description
                ap
                rollDice                
              }
            }
          }
          items {
            data {
              attributes {
                name
                slug
              }
            }
          }       
        }
      }
    }
  }
`;

export function loadCharacter(tokenId): Promise<Character> {
	let character = new Character();
	return fetch(config.graphUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: getCharacterBySlugQuery,
			variables: { tokenId }
		})
	})
		.then(async (response) => {
			if (response.ok) {
				const json = await response.json();
				console.log('data', tokenId, json);

				character =
					json.data.characters.data && json.data.characters.data.length > 0
						? {
								id: json.data.characters.data[0].id,
								...json.data.characters.data[0].attributes,
								loaded: true
						  }
						: null;

				if (character != null) {
					// const token = new Token();
					// token.tokenId = character.token.data.attributes.tokenId;
					// token.contract = {
					// 	slug: character.token.data.attributes.contract.data.attributes.slug
					// };

					//character.token = token;

					if (character.imageUrl == null || character.imageUrl.length === 0)
						character.imageUrl = '/assets/missing-image.png';
					if (character.thumbnailUrl == null || character.thumbnailUrl.length === 0)
						character.thumbnailUrl = '/assets/missing-image.png';
					if (!character.currentLocation?.data) character.currentLocation = { data: { id: null } };
					if (!character.originLocation?.data) character.originLocation = { data: { id: null } };
				} else {
					character = new Character();
					character.name = 'Not found';
				}

				return character;
			}
			return new Character();
		})
		.catch((reason) => {
			console.log('loadCharacter failed', reason);
			return new Character();
		});
}
