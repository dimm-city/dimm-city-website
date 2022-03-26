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
                 attributes{
                     name
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
