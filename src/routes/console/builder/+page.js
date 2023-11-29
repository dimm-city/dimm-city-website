import { loadEntityPageFromStrapi } from '$lib/Shared/SvelteStrapi';

/**
 *
 * @param {import('./$types').PageLoadEvent} page
 * @returns {Promise<{mode: string|null, citizenSlug: string|null, skillTree: string|null, skillTreeData: DC.SkillTree | null}>}
 */
export const load = async (page) => {
	const mode = page.url.searchParams.get('mode');
	const citizenSlug = page.url.searchParams.get('citizen');
	const skillTree = page.url.searchParams.get('skill-tree');

	const skillTreeData = await loadEntityPageFromStrapi(page, 'dimm-city/skill-trees', {
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
		citizenSlug,
		skillTree,
		skillTreeData
	};
	return data;
};

export const prerender = false;
export const ssr = false;
export const csr = true;
