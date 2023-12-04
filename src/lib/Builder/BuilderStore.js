import { writable } from 'svelte/store';
import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';
import { jwt } from '$lib/Shared/Stores/UserStore';
import { getCharactersByUser } from '$lib/Shared/Stores/getCharacters';

const client = new StrapiClient(config.apiBaseUrl, $jwt);

/**
 * @type {any[]}
 */
export let availableCharacters = writable([]);

/**
 * @type {DC.Character}
 */
export let selectedCharacter = writable();

/**
 * Load available characters
 */
export async function loadAvailableCharacters() {
  const results = await getCharactersByUser($jwt);
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
}
