import { getLatestCharacters } from '$lib/Shared/Stores/getCharacters';
import { getDistricts } from '$lib/Shared/Stores/getDistricts';
import { getFeaturedJournalEntries } from '$lib/Shared/Stores/getJournalEntries';
import { getFeaturedSpecialties } from '$lib/Shared/Stores/getSpecialties';

export const load = async () => {
	const latestNews = await getFeaturedJournalEntries();
	const districts = await getDistricts();
	const specialties = await getFeaturedSpecialties();
	const citizens = await getLatestCharacters();

	return {
        latestNews,
        districts,
        specialties,
        citizens    
    };
};
