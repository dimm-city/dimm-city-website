<script lang="ts">
	import { profile } from '$lib/Shared/Stores/UserStore';
</script>

<style>
	h1 {
		margin-bottom: 0;
	}
</style>

<div>
	<h1>{$profile.settings.displayName}</h1>
	<small><a href="/console/archive">archive: {$profile.settings.wallet.address}</a> </small>
    <p>{@html $profile.settings.bio}</p>
</div>
