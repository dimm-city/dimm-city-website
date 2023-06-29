import { getSpecialties } from '$lib/Specialties/getSpecialties';
import { getCharactersQuery } from '../Characters/Queries/getCharacters';
import { getJournalEntries } from '../JournalEntries/getJournalEntries';
import { getDistricts } from '../Locations/getDistricts';

export async function searchArchive(searchText = '', itemType = 'all') {

    /**
     * @type {import("../Shared/Models/ISummaryItem").ISummaryItem[]}
     */
	let journalEntries = [];
    if(itemType.includes('all') || itemType.includes('journalEntry'))
        journalEntries = (await getJournalEntries(searchText));

    //let characters = [];
    //if(itemType.includes('character'))
    //    characters = (await getCharactersQuery(searchText));
    
    /**
     * @type {import("../Shared/Models/ISummaryItem").ISummaryItem[]}
     */
	let districts = [];
    if(itemType.includes('all') ||itemType.includes('location'))
       districts = (await getDistricts(searchText));
        
	/**
     * @type {import("../Shared/Models/ISummaryItem").ISummaryItem[]}
     */
	let specialties = [];
    if(itemType.includes('all') ||itemType.includes('specialty'))
       specialties = (await getSpecialties(searchText));
        



	//let characters = await getCharacters(searchText) ?? [];

	let results = [...journalEntries ?? [], ...districts ??[], ...specialties??[]];

	if (!itemType.includes('all')){
        console.log('filtering', itemType, results);
        results = results.filter((item) =>  itemType.includes(item.type));
    }

	if (searchText)
		results = results.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

	return results;
}
