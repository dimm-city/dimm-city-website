import { get, writable } from 'svelte/store';
import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';
import { jwt } from '$lib/Shared/Stores/UserStore';
import { getCharactersByUser } from '$lib/Shared/Stores/getCharacters';
import { updateEntity } from '$lib/Shared/SvelteStrapi';

const client = new StrapiClient(config.apiBaseUrl, get(jwt));

let advancedSkillMatrixMode = false;

/**
 * @type {import('svelte/store').Writable<DC.Character[]>}
 */
export let availableCharacters = writable([]);

/**
 * @type {import('svelte/store').Writable<DC.Character | null>}
 */
export let selectedCharacter = writable();

/**
 * @type { import('svelte/store').Writable<DC.SkillTree[]>}
 */
export let availableSkillTrees = writable([]);

/**
 * @type { import('svelte/store').Writable<DC.SkillTree | any>}
 */
export let selectedSkillTree = writable({ id: -1, attributes: {} });

/** @type {import('svelte/store').Writable<DC.Ability[]>} */
export let availableSkills = writable([]);

/** @type {import('svelte/store').Writable<DC.Ability | null>} */
export let selectedSkill = writable();

/**
 * @param {DC.SkillTree} _skillTree
 */
function setSkillTreeProperties(_skillTree) {
	if (_skillTree.attributes.abilities?.data?.length > 0) {
		_skillTree.maxRows = _skillTree.attributes.abilities.data
			.map((a) => a.attributes.level)
			.reduce((a, b) => Math.max(a, b));
		_skillTree.maxColumns = _skillTree.attributes.abilities.data
			.map((a) => a.attributes.module)
			.reduce((a, b) => Math.max(a, b));
	}

	_skillTree.pageImage = _skillTree.attributes.mainImage?.data?.attributes.url;

	if (!_skillTree.pageImage)
		_skillTree.pageImage =
			_skillTree.attributes.specialty?.data?.attributes.mainImage?.data?.attributes.url;

	if (!_skillTree.pageImage) _skillTree.pageImage = '/assets/missing-image.png';
}

/**
 * @param {DC.Ability[]} abilities
 */
function updateSkillMatrix(abilities) {
	if (advancedSkillMatrixMode) {
		//TODO: Implement advanced mode, unlock only adjacent skills
		throw new Error('Function not implemented.');
	} else {
		//Get selected characters selected abilities
		const charactersAbilities = get(selectedCharacter)?.attributes.selectedAbilities.data;

		// Get the max level of a skill that has been acquired
		let maxLevel = Math.max(...(charactersAbilities?.map((s) => s.attributes.level) ?? [0])) + 1;

		if (maxLevel < 0) maxLevel = 1;

		//Set all skill tree abilities acquired property to true if
		// that skill is in the selected characters selected abilities.
		// Unlock all abilities at the max acquired level + 1
		abilities.forEach((s) => {
			s.unlocked = s.attributes.level <= maxLevel;
			s.acquired = charactersAbilities?.map((a) => a.id).includes(s.id) ?? false;
		});

		return abilities;
	}
}

/**
 * @param {string} action
 * @param {DC.Ability} ability
 */
async function updateCharacterAbility(action, ability) {
	await fetch(
		`${config.apiBaseUrl}/dimm-city/characters/${get(selectedCharacter)?.id}/${action}-ability/${
			ability.id
		}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${get(jwt)}`,
				'Content-Type': 'application/json'
			}
		}
	)
		.then(
			async (
				/** @type {{ json: () => PromiseLike<{ data: any; errors: any; }> | { data: any; errors: any; }; ok: any; }} */ res
			) => {
				const { data, errors } = await res.json();
				if (res.ok) {
					// @ts-ignore
					selectedCharacter.update((c) => {
						if (!c) return;

						if (action === 'add') {
							c.attributes.selectedAbilities.data.push(ability);
						} else {
							c.attributes.selectedAbilities.data = [
								...c.attributes.selectedAbilities.data.filter((a) => a.id !== ability.id)
							];
						}
						console.log('updated', c.attributes.selectedAbilities.data);
						return c;
					});
					
                    availableSkills.update((values) => {
						updateSkillMatrix(values);
						return values;
					});

				} else {
					//TODO: display error
					console.error('failed', errors, data);
				}
			}
		)
		.catch((/** @type {any} */ reason) => {
			console.log('could not update character', reason);
		});
}

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

	/** @type {DC.Character} */
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
	if (data?.attributes?.specialties?.data)
		loadAvailableSkillTrees(data?.attributes?.specialties?.data?.map((s) => s.id));
}

export async function updateCharacter() {
	//if (ownsToken(data.attributes.tokenId)) {

	const currentData = get(selectedCharacter);

	if (!currentData) return;

	const importData = JSON.parse(JSON.stringify(currentData.attributes));
	importData.playerUpdated = true;

	delete importData.mainImage;
	delete importData.mainModel;
	delete importData.mainVideo;
	delete importData.mainAudio;

	importData.currentLocation = currentData.attributes.currentLocation.data.id;
	importData.originLocation = currentData.attributes.originLocation.data?.id;

	if (currentData.attributes.specialties.data?.length > 0)
		importData.specialties = [
			...currentData.attributes.specialties.data.map((r) => ({
				id: r.id
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
 * @param {Number[]} specialtyIds
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

	/** @type {DC.SkillTree} */
	const skillTree = await client.loadBySlug('dimm-city/skill-trees', slug, {
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

	setSkillTreeProperties(skillTree);

	updateSkillMatrix(skillTree.attributes.abilities.data ?? []);

	selectedSkillTree.set({
		...skillTree
	});

	availableSkills.set([...skillTree.attributes.abilities.data]);
}

/**
 * @param {DC.Ability | null} skill
 */
export function selectSkill(skill) {
	if (skill == null) {
		selectedSkill.set(null);
	} else {
		skill.selected = true;
		selectedSkill.set(skill);
	}
}

/**
 * @param {DC.Ability | null} skill
 */
export async function acquireSkill(skill) {
	if (skill == null) return;
	await updateCharacterAbility('add', skill);
}

/**
 * @param {DC.Ability | null} skill
 */
export async function removeSkill(skill) {
	if (skill == null) return;
	await updateCharacterAbility('remove', skill);
}
