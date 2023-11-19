import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/**
 *
 * @param {any} params
 * @returns {Promise<any>}
 */
export const load = async (params) => {
    const data =  await loadEntityPageFromStrapi(params, 'dimm-city/skill-trees', {
        filters: {
            slug: {
                $eq: params.params.slug
            }
        },
        populate: {
            mainImage: true,
            specialty: {
                populate: {
                    mainImage: true,
                    skillTrees: true
                }
            },
            abilities: {
                populate: {
                    children: {
                        fields: ['id']
                    },
                    parents: {
                        fields: ['id']
                    }
                }
            }
        }
    });

    return data;
};


export const prerender = 'auto';