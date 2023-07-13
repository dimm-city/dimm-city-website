
import { config } from '$lib/Shared/config';

export async function searchArchive(searchText = '', itemTypes = ['all']) {

    //POST: /api/dimm-city/archives/search

    var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: searchText,
            types: itemTypes
        })
      };
      
       /**
     * @type {DC.BaseEntity[]}
     */
      let results = [];
      let response = await fetch(`${config.apiBaseUrl}/dimm-city/archives/search`, requestOptions);
      if(response.ok)
      {
          results = await response.json();
      }
      return results;
}
