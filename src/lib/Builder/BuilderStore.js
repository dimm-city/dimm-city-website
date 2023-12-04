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

	if (!currentData) return;

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

	/** @type {DC.SkillTree} */
	const _skillTree = await client.loadBySlug('dimm-city/skill-trees', slug, {
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

	_skillTree.attributes.abilities?.data?.forEach((ability) => {
		if (ability.attributes.level == 1) {
			ability.unlocked = true;
		}
	});

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

	unlockSkills(_skillTree.attributes.abilities.data ?? []);

	selectedSkillTree.set({
		..._skillTree
	});

	availableSkills.set([..._skillTree.attributes.abilities.data]);
}

let advancedMode = false;
/**
 * @param {DC.Ability[]} abilities
 */
function unlockSkills(abilities) {
	if (advancedMode) {
		//TODO: Implement advanced mode, unlock only adjacent skills
		throw new Error('Function not implemented.');
	} else {
		//Get selected characters selected abilities
		const charactersAbilities = get(selectedCharacter)?.attributes.selectedAbilities.data;

		//Set all skill tree abilities acquired property to true if
		// that skill is in the selected characters selected abilities
		abilities.forEach((a) => {
			if (charactersAbilities?.map((s) => s.id).includes(a.id)) a.acquired = true;
		});

		// Get the max level of a skill that has been acquired
		let maxLevel =
			Math.max(...abilities.filter((s) => s.acquired).map((s) => s.attributes.level)) + 1;

		if (maxLevel < 0) maxLevel = 1;

		abilities.forEach((s) => {
			s.unlocked = s.attributes.level <= maxLevel;
		});

		return abilities;
	}
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
	availableSkills.update((values) => {	    
		values.forEach((s) => {
			s.selected = s === skill;
		});		
        return values;
	});
}

/**
 * @param {DC.Ability | null} skill
 */
export async function acquireSkill(skill) {
	if (skill == null) return;
	skill.acquired = true;
	availableSkills.update((values) => {

		const value = values.find((s) => s.id === skill.id);
		if (value) {
			value.acquired = true;
			//TODO: update character via API
		}

        unlockSkills(values);
		return values;
	});

}

/**
 * @param {DC.Ability | null} skill
 */
export async function removeSkill(skill) {
	if (skill == null) return;
	skill.acquired = false;
	availableSkills.update((values) => {
		const value = values.find((s) => s.id === skill.id);
		if (value) {
			value.acquired = false;
			//TODO: update character via API
		}
        unlockSkills(values);
		return values;
	});
}
