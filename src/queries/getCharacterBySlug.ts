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
                    attributes{
                      name
                      slug
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
              attributes {
                name
                slug
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
