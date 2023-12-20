<script>
	import ProfileImage from '$lib/Shared/Components/ProfileImage.svelte';
	import { selectedCharacter } from './BuilderStore';
</script>

<ProfileImage character={$selectedCharacter} />
