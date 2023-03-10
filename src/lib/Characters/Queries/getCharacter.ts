export const getCharacterQuery = `
  query getCharacter($id: ID!) {
    character(id: $id) {      
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
          specialties {
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
