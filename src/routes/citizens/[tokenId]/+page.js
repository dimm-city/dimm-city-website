import { loadCharacter } from '$lib/Characters/Queries/getCharacterBySlug';

export const load = (async (page) => {
    const data = await loadCharacter(page.params.tokenId);
    console.log('character data',data);
    return data;
});