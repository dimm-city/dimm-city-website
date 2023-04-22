<script lang="ts">
	import type { ICharacter } from '$lib/Characters/Models/Character';

	export let character: ICharacter;

	export let isEditing = false;
</script>

<div class="physical-stats">
	<div>
		Pronouns:
		<span>{character.pronouns || 'they/them'}</span>
	</div>
	<div>
		Age:
		<span>{character.age ?? 'Unknown'} </span>
	</div>
	<div>
		Race:
		<span>
			{#if character.race}
				{character.race.data?.attributes?.name}
			{/if}
		</span>
	</div>
	<div>
		Height:
		<span>{character.height || 0} m</span>
	</div>
	<div>
		Weight:
		<span>{character.weight || 0} kg</span>
	</div>
	<div>
		Eyes:
		<span>{character.eyes || ''}</span>
	</div>
	<div>
		Skin:
		<span>{character.skin || ''}</span>
	</div>
</div>

<style>
	span {
		margin-left: 0.5rem;
	}

	.physical-stats {
		width: 100%;
		height: 100%;
		display: grid;
		margin-left: 0.25rem;
		align-content: start;
		gap: 1rem;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
