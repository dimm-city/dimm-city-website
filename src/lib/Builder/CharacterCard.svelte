<script>
	import { formatCharacterSpecialties } from "$lib/Shared/FormatFunctions";

    /**
     * @type {DC.Character}
     */
  export let character;
</script>

<div class="character-card">
  <h2>{character.attributes.name}</h2>
  <h3>{character.attributes.tokenId}</h3>
  <img src={character.attributes.mainImage?.data?.attributes.formats?.thumbnail.url} alt={character.attributes.name} />

  <div class="details">
    <p> {formatCharacterSpecialties(character)}</p>
    <p> {character.attributes.currentLocation?.data?.attributes.name}</p>
  </div>
</div>

<style>
  .character-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  img {
    max-width: 100%;
    height: 300px;
    margin-bottom: 1rem;
  }

  .details {
    text-align: center;
  }
</style>