
import { config } from '$lib/Shared/config';

/**
 * Search the archive for items.
 * 
 * @param {string} searchText - The text to search for.
 * @param {string[]} itemTypes - The types of items to search for.
 * 
 * @returns {Promise<DC.BaseEntity[]>} The search results.
 * 
 * @throws {Error} When the fetch request fails.
 */
export async function searchArchive(searchText = '', itemTypes = ['all']) {
    //POST: /api/dimm-city/archives/search

    const requestOptions = {
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
    try {
        let response = await fetch(`${config.apiBaseUrl}/dimm-city/archives/search`, requestOptions);
        if(response.ok) {
            results = await response.json();
        }
    } catch (error) {
        throw new Error(`Failed to fetch archive items: ${error?.message}`);
    }
    return results;
}
