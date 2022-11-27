<script lang="ts">
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import { connect, loggedIn,  sessionToken } from '$lib/Shared/ChainStore';
</script>

{#if $loggedIn && $sessionToken > ''}
	<slot />
{:else}
	<MenuItem on:click={connect}>
        Connect
    </MenuItem>
{/if}
