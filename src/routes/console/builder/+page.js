import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/**
 *
 * @param {import('./$types').PageLoadEvent} page
 * @returns {Promise<any>}
 */
export const load = async (page) => {

    const mode = page.url.searchParams.get('mode');
    const citizen = page.url.searchParams.get('citizen');
    const skillTree = page.url.searchParams.get('skill-tree');

    const skillTreeData =  await loadEntityPageFromStrapi(page, 'dimm-city/skill-trees', {
        filters: {
            slug: {
                $eq: skillTree
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

    const data = {
        mode,
        citizen,
        skillTree,
        skillTreeData
    };
    console.log(data, 'data');
    return data;
};


export const prerender = false;
export const ssr = false;
export const csr = true;