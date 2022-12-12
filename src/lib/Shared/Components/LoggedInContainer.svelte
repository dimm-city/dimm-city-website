<script lang="ts">
	import { connect, loggedIn, sessionToken } from '$lib/Shared/Stores/UserStore';
	import { config } from '../config';
	import Button from './Button.svelte';
</script>

{#if $loggedIn && $sessionToken > ''}
	<slot />
{:else}
	<slot name="public">
		<div class="content-container">
			<div class="fade-in">
				<Button url={config.apiBaseUrl + '/connect/reddit'}>Login with Reddit</Button>
				<Button on:click={connect}>Connect Metamask</Button>
			</div>
		</div>
	</slot>
{/if}
