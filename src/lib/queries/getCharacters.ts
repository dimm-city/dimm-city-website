export const getCharactersQuery = `
query {
    characters{
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
         roles {
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
