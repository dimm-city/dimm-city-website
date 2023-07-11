<script>
	import { loggedIn } from '$lib/Shared/Stores/UserStore';

	import HexMenu from '../Components/Menu/HexMenu.svelte';
	import MenuItem from '../Components/Menu/MenuItem.svelte';
</script>

<HexMenu icon="bi bi-menu-button" class="main-menu" title="main menu">
	<div class="menu-toolbar">
		<a href="/" data-augmented-ui="all-hex border" title="home">
			<i class="bi bi-globe2 fade-in" />
		</a>
		<a href="/console" data-augmented-ui="all-hex border" title="op console">
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
		description="Locations identified within Dimm City"
	/>
	<MenuItem
		url="/characters"
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
		url="/items"
		icon="bi-tools"
		title="Items"
		description="Search the items of Dimm City"
	/>
<MenuItem url="/console/dreams" icon="bi-controller" title="Dream Console" description="Dimm City solo campaigns" />
	<MenuItem url="/spores" icon="bi-hypnotize" title="Spores" description="Dreams of Dimm City" />
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

	.menu-toolbar a:hover,
	.menu-toolbar a:focus {
		color: var(--yellow);
	}

    :global(.main-menu .dropdown-content.visible) {
		z-index: 1;
		opacity: 1;
		transform: translateY(0) translateX(23rem) !important;
		transition: all 0.2s ease-in-out;
	}
	@media (max-width: 767px) {
		:global(.main-menu .dropdown-content.visible) {
			transform: translateY(0) translateX(0) !important; 
            bottom: 3rem !important;
            left: 1rem !important;
		}
        :global(.main-menu .dropdown-content.hidden) {
			transform: translateY(-80dvh) translateX(0rem) !important;
            bottom: -100vh !important;
            left: 1rem !important;
		}
	}
</style>
