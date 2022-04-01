export const getCharacterBySlugQuery = `
  query getCharacterBySlug($tokenId: String!) {
    characters(filters: { tokenId: { eq: $tokenId } }) {      
      data {
        id
        attributes {
          tokenId
          name
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
          clothing
          imageUrl
          thumbnailUrl
          mainImage{
            data{
              attributes{
                url
                previewUrl
              }
            }
          }
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
          roles {
            data {
              attributes {
                name
                slug
              }
            }
          }         
          currentLocation {
            data {
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
