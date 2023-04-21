<script>
	import { loggedIn } from "$lib/Shared/Stores/UserStore";


	import HexMenu from "./HexMenu.svelte";
	import MenuItem from "./MenuItem.svelte";

</script>


<HexMenu icon="bi bi-menu-button">
    <div class="menu-toolbar">
        <a href="/"  data-augmented-ui="all-hex border" title="home">
            <i class="bi bi-globe2 fade-in" />
        </a>
        <a
            href="/console"
            data-augmented-ui="all-hex border"
            title="op console"
        >
            {#if $loggedIn}
                <i class="bi bi-person-check-fill fade-in" />
            {:else}
                <i class="bi bi-person-x-fill fade-in" />
            {/if}
        </a>
    </div>
    <MenuItem
        icon="bi bi-journal-code"
        title="Founder Journals"
        url="/journal-entries"
        description="Files from the founder's journals"
    />

    <MenuItem
        url="/locations"
        icon="bi-map"
        title="Locations"
        description="Districts and locations identified within Dimm City"
    />
    <MenuItem
        url="/citizens"
        icon="bi-people"
        title="Citizen Files"
        description="Access the available citizen files"
    />
    <MenuItem
        url="/specialties"
        icon="bi-code"
        title="Specialties"
        description="Documenting the true skills of the Sporos"
    />

    <MenuItem
        url="/spores"
        icon="bi-hypnotize"
        title="Spores"
        description="Dreams of Dimm City"
    />
    <MenuItem
        url="/about/stats"
        icon="bi-bar-chart"
        title="System Stats"
        description="Console information and diagnostics"
    />
    <MenuItem
        icon="bi bi-diagram-3"
        title="System Map"
        url="/system-map"
        description="Map of Dimm City Console"
    />
</HexMenu>

<style>
	.menu-toolbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	:global(.global-toolbar .menu-item) {
		height: min-content;
		padding: 0.5rem;
	}
    :global(.global-toolbar .menu-item:hover) {
		color: var(--fourth-accent);
	}
	:global(.global-toolbar .menu-item p, .global-toolbar .menu-item small) {
		margin-block: 0.25rem;
        margin-inline: 0.25rem;
	}

  
	.menu-toolbar a {
		cursor: pointer;
        display: flex;
		border: none;
		background: var(--pink);
        color: var(--light);
        font-size: 2rem;        
        justify-content: center;
        align-items: center;
		--aug-border-all: 1px;
		--aug-border-bg: var(--blue);
		--aug-all-width: max(5vh, 2vw);
		transition: transform var(--easing);
	}

    .menu-toolbar a:hover, .menu-toolbar a:focus{
        color: var(--yellow);
    }
</style>