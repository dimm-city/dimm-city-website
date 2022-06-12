<script>
	import Menu from './Menu.svelte';
	import MenuItem from './MenuItem.svelte';
</script>

<Menu>
	
	<MenuItem url="/citizens" icon="bi-people" title="Citizen Files" description="Access the available citizen files" />

	<MenuItem url="/locations" icon="bi-map" title="Locations" description="View information about locations identified within Dimm City" />
	<MenuItem url="/specialties" icon="bi-school" title="Specialties" description="Documenting the true skills of the Sporos" />

	<MenuItem icon="bi bi-journals" title="Historical Records" url="/history" description="History of Dimm City" />

	<!-- <MenuItem url="/console/man" icon="bi-info-circle" title="Op Manual" description="Operator's Console Manual" /> -->
	<MenuItem
		url="/console"
		icon="bi-person-workspace"
		title="Op Console"
		description="Connect to your Operator's Console"
	/>
	<MenuItem
		url="/console/change-log"
		icon="bi-journal-check"
		title="Change Log"
		description="Latest changes to Dimm City Console"
	/>
	<MenuItem
		url="/console/stats"
		icon="bi-diagram-3"
		title="System Stats"
		description="Console information and diagnostics"
	/>
</Menu>
