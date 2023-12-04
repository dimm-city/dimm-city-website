import { get, writable } from 'svelte/store';
import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';
import { jwt } from '$lib/Shared/Stores/UserStore';
import { getCharactersByUser } from '$lib/Shared/Stores/getCharacters';
import { updateEntity } from '$lib/Shared/SvelteStrapi';

const client = new StrapiClient(config.apiBaseUrl, get(jwt));

/**
 * @type {import('svelte/store').Writable<DC.Character[]>}
 */
export let availableCharacters = writable([]);

/**
 * @type {import('svelte/store').Writable<DC.Character | any>}
 */
export let selectedCharacter = writable({ id: -1, attributes: {} });

/**
 * @type { import('svelte/store').Writable<DC.SkillTree[]>}
 */
export let availableSkillTrees = writable([]);

/**
 * @type { import('svelte/store').Writable<DC.SkillTree | any>}
 */
export let selectedSkillTree = writable({ id: -1, attributes: {} });

/** @type {import('svelte/store').Writable<DC.Ability | null>} */
export let selectedSkill = writable();

/**
 * Load available characters
 */
export async function loadAvailableCharacters() {
	const results = await getCharactersByUser(get(jwt));
	if (results.data?.length > 0) {
		availableCharacters.set([...results.data]);
	}
}

/**
 * Load character by token id
 * @param {any} tokenId
 */
export async function loadCharacter(tokenId) {
	console.log('loadCharacter', tokenId);
	const data = await client.loadBySlug('dimm-city/characters', tokenId, {
		filters: {
			tokenId: tokenId
		},
		populate: {
			mainImage: true,
			race: true,
			originLocation: true,
			currentLocation: true,
			selectedAbilities: true,
			specialties: {
				populate: {
					skillTrees: true
				}
			}
		}
	});

	selectedCharacter.set({
		...data
	});
	if (data?.attributes?.selectedAbilities?.data)
		loadAvailableSkillTrees(
			data?.attributes?.specialties?.data?.map((/** @type {{ id: any; }} */ s) => s.id)
		);
}

export async function updateCharacter() {
	//if (ownsToken(data.attributes.tokenId)) {

	const currentData = get(selectedCharacter);

	const importData = JSON.parse(JSON.stringify(currentData.attributes));
	importData.playerUpdated = true;

	delete importData.mainImage;
	delete importData.mainModel;
	delete importData.mainVideo;
	delete importData.mainAudio;

	importData.currentLocation = currentData.attributes.currentLocation;
	importData.originLocation = currentData.attributes.originLocation;

	if (currentData.attributes.specialties.data?.length > 0)
		importData.specialties = [
			...currentData.attributes.specialties.data.map((r) => ({
				id: Number.parseInt(r.id)
			}))
		];
	else importData.specialties = [];

	await updateEntity('dimm-city/characters', {
		id: currentData.id,
		...importData
	})
		.then(() => {
			console.log('character saved', currentData);
		})
		.catch((reason) => {
			console.error('Error updating citizen file', reason);
		});

	//}
}

/**
 * @param {string[]} specialtyIds
 */
export async function loadAvailableSkillTrees(specialtyIds) {
	if (specialtyIds?.length === 0) return;
	const response = await client.search('dimm-city/skill-trees', {
		filters: {
			specialty: [...specialtyIds]
		},
		populate: '*'
	});
	if (response.data?.length > 0) {
		availableSkillTrees.set([...response.data]);
	}
}

/**
 * @param {string} slug
 */
export async function loadSkillTree(slug) {
	console.log('loadSkillTree', slug);
	const data = await client.loadBySlug('dimm-city/skill-trees', slug, {
		filters: {
			slug: slug
		},
		populate: {
			mainImage: true,
			abilities: true,
			specialty: {
                populate: {
                    mainImage: true
                }
            }
		}
	});

	selectedSkillTree.set({
		...data
	});
}
