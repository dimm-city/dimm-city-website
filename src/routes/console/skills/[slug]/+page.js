import { loadEntityPageFromStrapi, search } from '$lib/Shared/SvelteStrapi';

/**
 *
 * @param {any} params
 * @returns {Promise<any>}
 */
export const load = async (params) => {
	const { fetch } = params;
    const data =  await loadEntityPageFromStrapi(params, 'dimm-city/skill-trees');
 
    const skills = await search(fetch, 'dimm-city/abilities', {
        filters: {
            skillTrees: {
                id: data.id
            }
        },
        populate: "*"
    })

    console.log(skills);
    if(!data.attributes.abilities)
        data.attributes.abilites = {};
    
    data.attributes.abilities.data = skills.data;
    console.log(data);
    return data;
};


export const prerender = 'auto';