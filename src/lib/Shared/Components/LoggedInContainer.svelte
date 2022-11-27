<script lang="ts">
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import { connect, loggedIn,  sessionToken } from '$lib/Shared/Stores/ChainStore';
</script>

{#if $loggedIn && $sessionToken > ''}
	<slot />
{:else}
	<MenuItem on:click={connect}>
        Connect
    </MenuItem>
{/if}
