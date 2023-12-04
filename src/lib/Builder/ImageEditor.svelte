<script>
	import ProfileImage from '$lib/Characters/Components/ProfileImage.svelte';
	import { selectedCharacter } from './BuilderStore';
</script>

<ProfileImage character={$selectedCharacter} />
