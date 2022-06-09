export const getCharactersQuery = `
query {
    characters(pagination: { page: 1, pageSize: 100 }){
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
